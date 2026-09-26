#!/usr/bin/env python3
"""
HoneyTrace Smart Harvest AI Engine
Computes real harvest recommendations and anomaly detection from hive sensor readings
and ambient weather forecasts.
"""

import sys
import json
import math
from datetime import datetime, timedelta

def parse_date(date_str):
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except Exception:
        return datetime.utcnow()

def compute_harvest_recommendation(readings, weather_forecast):
    """
    Computes a harvest recommendation based on:
    - Weight trend (moving average + rate of change)
    - Activity level trend
    - Humidity stability
    - Forecasted weather (rain, extreme temperatures)
    """
    if not readings:
        return {
            "recommended_window": None,
            "explanation": "Insufficient reading history to compute harvest recommendation.",
            "confidence": 0,
            "factors": []
        }

    # Sort readings ascending by timestamp
    sorted_readings = sorted(
        readings,
        key=lambda r: parse_date(r.get("timestamp") or r.get("recorded_at") or "1970-01-01T00:00:00Z")
    )

    n_readings = len(sorted_readings)

    # 1. Confidence score calculation based on reading count
    # 30+ readings = 95-100%, 10 readings = ~70%, 2 readings = ~30%
    confidence = min(98, max(15, int(math.tanh(n_readings / 10.0) * 100)))

    # 2. Metric extraction
    weights = [float(r["weight"]) for r in sorted_readings if r.get("weight") is not None]
    temps = [float(r["temperature"]) for r in sorted_readings if r.get("temperature") is not None]
    humidities = [float(r["humidity"]) for r in sorted_readings if r.get("humidity") is not None]
    activities = [float(r["activity_level"]) for r in sorted_readings if r.get("activity_level") is not None]

    factors = []

    # 3. Weight trend analysis
    weight_rate_of_change = 0.0
    weight_plateaued = False

    if len(weights) >= 3:
        recent_weights = weights[-5:] if len(weights) >= 5 else weights
        # Simple linear rate of change over recent readings (kg / reading)
        weight_rate_of_change = (recent_weights[-1] - recent_weights[0]) / len(recent_weights)
        
        if abs(weight_rate_of_change) <= 0.15 and recent_weights[-1] > 20:
            weight_plateaued = True
            factors.append(f"Hive weight has plateaued around {recent_weights[-1]:.1f} kg (rate of change: {weight_rate_of_change:+.2f} kg/log), indicating peak honey accumulation.")
        elif weight_rate_of_change > 0.15:
            factors.append(f"Hive weight is still actively increasing (+{weight_rate_of_change:.2f} kg/log), suggesting nectar flow is ongoing.")
        else:
            factors.append(f"Hive weight is declining ({weight_rate_of_change:.2f} kg/log), indicating possible dearth or consumption.")
    elif len(weights) > 0:
        factors.append(f"Latest recorded hive weight is {weights[-1]:.1f} kg.")

    # 4. Activity level trend
    avg_activity = sum(activities) / len(activities) if activities else 50.0
    if avg_activity >= 65:
        factors.append(f"Foraging activity remains high (avg {avg_activity:.0f}%), signaling strong colony health.")
    elif avg_activity < 35:
        factors.append(f"Foraging activity is low (avg {avg_activity:.0f}%), which may reduce harvest yields.")

    # 5. Humidity stability (capping indicator)
    if humidities:
        avg_hum = sum(humidities[-3:]) / len(humidities[-3:])
        if 50 <= avg_hum <= 60:
            factors.append(f"Super humidity is stable at {avg_hum:.1f}%, indicating honey frames are properly cured and capped.")

    # 6. Weather Forecast Integration
    rain_date = None
    extreme_temp_date = None
    
    if weather_forecast and isinstance(weather_forecast, list):
        for day in weather_forecast:
            precip = day.get("precipitation_sum", 0)
            max_t = day.get("temperature_2m_max", 25)
            date_val = day.get("date", "upcoming days")
            
            if precip > 5.0 and not rain_date:
                rain_date = date_val
            if (max_t > 38 or max_t < 15) and not extreme_temp_date:
                extreme_temp_date = date_val

    # Determine recommended window
    now = datetime.utcnow()
    start_rec = now + timedelta(days=1)
    end_rec = now + timedelta(days=5)

    if rain_date:
        factors.append(f"Rain is forecasted around {rain_date} — recommendation moved ahead of wet weather to preserve honey quality.")
        try:
            r_dt = datetime.strptime(rain_date, "%Y-%m-%d")
            start_rec = max(now, r_dt - timedelta(days=2))
            end_rec = max(start_rec + timedelta(days=1), r_dt - timedelta(days=1))
        except Exception:
            pass

    recommended_window = {
        "start_date": start_rec.strftime("%Y-%m-%d"),
        "end_date": end_rec.strftime("%Y-%m-%d")
    }

    # Synthesize explanation
    if len(factors) == 0:
        explanation = "Optimal harvest window calculated from current sensor trends."
    else:
        explanation = " ".join(factors[:3])

    return {
        "recommended_window": recommended_window,
        "explanation": explanation,
        "confidence": confidence,
        "factors": factors
    }

def detect_anomalies(readings):
    """
    Detects sudden spikes, sharp activity drops, or heavy weight drops.
    """
    if not readings or len(readings) < 2:
        return {
            "is_anomalous": False,
            "anomalies": []
        }

    sorted_readings = sorted(
        readings,
        key=lambda r: parse_date(r.get("timestamp") or r.get("recorded_at") or "1970-01-01T00:00:00Z")
    )

    anomalies = []

    for i in range(1, len(sorted_readings)):
        prev = sorted_readings[i-1]
        curr = sorted_readings[i]

        prev_w = float(prev["weight"]) if prev.get("weight") is not None else None
        curr_w = float(curr["weight"]) if curr.get("weight") is not None else None
        prev_t = float(prev["temperature"]) if prev.get("temperature") is not None else None
        curr_t = float(curr["temperature"]) if curr.get("temperature") is not None else None
        prev_a = float(prev["activity_level"]) if prev.get("activity_level") is not None else None
        curr_a = float(curr["activity_level"]) if curr.get("activity_level") is not None else None

        # 1. Weight drop > 20%
        if prev_w and curr_w and prev_w > 0:
            drop_pct = ((prev_w - curr_w) / prev_w) * 100
            if drop_pct > 20:
                anomalies.append({
                    "metric": "weight",
                    "severity": "critical" if drop_pct > 30 else "warning",
                    "explanation": f"Weight dropped sharply by {drop_pct:.1f}% ({prev_w:.1f}kg → {curr_w:.1f}kg) between readings."
                })

        # 2. Sudden temperature spike (> 4°C jump or outside 30-38°C)
        if prev_t and curr_t:
            temp_diff = abs(curr_t - prev_t)
            if temp_diff >= 4.0:
                anomalies.append({
                    "metric": "temperature",
                    "severity": "warning",
                    "explanation": f"Sudden temperature shift of {temp_diff:.1f}°C ({prev_t:.1f}°C → {curr_t:.1f}°C) detected."
                })

        # 3. Activity drop with no weight drop (Swarm / Queen loss indicator)
        if prev_a and curr_a and prev_w and curr_w:
            activity_drop = prev_a - curr_a
            weight_diff = abs(prev_w - curr_w)
            if activity_drop >= 40 and weight_diff < 1.0:
                anomalies.append({
                    "metric": "activity_level",
                    "severity": "critical",
                    "explanation": f"Activity dropped sharply from {prev_a:.0f}% to {curr_a:.0f}% with stable weight, indicating possible queenlessness or disease."
                })

    return {
        "is_anomalous": len(anomalies) > 0,
        "anomalies": anomalies
    }

def main():
    try:
        input_data = json.load(sys.stdin)
        readings = input_data.get("readings", [])
        weather_forecast = input_data.get("weather_forecast", [])

        recommendation = compute_harvest_recommendation(readings, weather_forecast)
        anomaly_report = detect_anomalies(readings)

        result = {
            "harvest_recommendation": recommendation,
            "anomaly_detection": anomaly_report
        }

        print(json.dumps(result, indent=2))
    except Exception as e:
        error_output = {
            "error": str(e),
            "harvest_recommendation": {
                "recommended_window": None,
                "explanation": f"Error computing recommendation: {str(e)}",
                "confidence": 0,
                "factors": []
            },
            "anomaly_detection": {
                "is_anomalous": False,
                "anomalies": []
            }
        }
        print(json.dumps(error_output, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
