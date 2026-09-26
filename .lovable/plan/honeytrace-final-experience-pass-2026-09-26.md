# HoneyTrace final experience pass

## Scope
- Restore the uploaded HoneyTrace application into this project while preserving its existing visual direction and data behavior.
- Apply the requested consistency pass across Home, Login, Dashboard, Batches, Batch Detail, Hive Detail, Verify, and Partner Portal.

## Implementation
1. **Connected navigation**
   - Keep one route-aware page transition wrapper at the shared app root so every route uses the same entrance motion.
   - Remove duplicate route-level entrance animations and add a shared pending-route view using the HoneyTrace loader.
   - Preserve reduced-motion behavior for accessibility.

2. **Subtle internal BeeSwarm**
   - Place a compact, clipped BeeSwarm beside the internal app navigation so it persists across Dashboard, Batches, Batch Detail, Hive Detail, and Partner Portal.
   - Slow and fade the bees, with long quiet intervals, so they read as ambient detail rather than constant motion.

3. **Unified controls**
   - Standardize all Button variants on the same hover scale, honey glow, and pressed scale/ripple.
   - Replace command-style raw buttons with the shared Button component where appropriate.
   - Keep compact icon/rating controls accessible while giving them matching tactile feedback.

4. **Honeycomb loading pattern**
   - Add one reusable honeycomb loader with compact, inline, and full-page presentations.
   - Replace text-only and generic circular loading indicators for app data, mutations, QR generation, and verification with that pattern.

5. **Friendly empty states**
   - Add a reusable illustrated empty state using a small honeycomb/hive visual.
   - Use it on Dashboard and Batches with direct actions to add the first hive or create the first batch.

6. **Responsive verification**
   - Tighten headers, action rows, tables, timelines, QR areas, dialogs, and cards for narrow screens.
   - Prioritize `/verify/:batchId`: touch-sized controls, non-clipping trust/hero content, readable custody timeline, safe map and certificate layouts.

## Validation
- Confirm all requested routes render and navigate with the shared transition.
- Test desktop and mobile widths, including `/verify/:batchId` with realistic loaded data when an authenticated/public sample is available.
- Check the preview for layout overflow, runtime errors, and the latest build status.
