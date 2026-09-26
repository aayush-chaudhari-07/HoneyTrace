import QRCode from "qrcode";
import dotenv from "dotenv";
import { supabaseAdmin } from "../config/supabase.js";

dotenv.config();

/**
 * QR Code Generation & Supabase Storage Service
 */
export const qrService = {
  /**
   * Generates a QR code image encoding the public verification URL.
   * Stores the QR image in Supabase Storage ('batch-documents' bucket) and returns the public URL + reference ID.
   */
  async generateAndStoreBatchQr(batchId) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verificationUrl = `${frontendUrl}/verify/${batchId}`;

    // 1. Generate QR code Data URL (PNG)
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: "#2b1d0e", // HoneyTrace espresso
        light: "#fdf8ec", // HoneyTrace warm linen background
      },
    });

    const qrCodeId = `QR-${String(batchId).toUpperCase()}`;

    // 2. Upload QR code image to Supabase Storage ('batch-documents' bucket)
    try {
      const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = `qr-codes/${batchId}-qr.png`;

      const { data: uploadData, error: uploadErr } = await supabaseAdmin.storage
        .from("batch-documents")
        .upload(filePath, buffer, {
          contentType: "image/png",
          upsert: true,
        });

      if (!uploadErr && uploadData) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from("batch-documents")
          .getPublicUrl(filePath);

        return {
          qrCodeId,
          verificationUrl,
          qrImageUrl: publicUrlData?.publicUrl || qrDataUrl,
          storageReference: filePath,
        };
      }
    } catch (err) {
      console.warn("⚠️ Supabase Storage upload fell back to Data URL:", err.message);
    }

    return {
      qrCodeId,
      verificationUrl,
      qrImageUrl: qrDataUrl,
      storageReference: `data-url://${qrCodeId}`,
    };
  },
};
