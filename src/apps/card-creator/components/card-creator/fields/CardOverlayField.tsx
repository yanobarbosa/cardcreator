import { useCardCreator } from "@fabkit/apps/card-creator/stores/card-creator.ts";
import ImageUpload from "@fabkit/platform/components/form/ImageUpload";
import { useTranslation } from "react-i18next";

export function CardOverlayField({
	positioningLayer,
	setPositioningLayer,
	viewBox,
}: {
	positioningLayer: "artwork" | "overlay";
	setPositioningLayer: (layer: "artwork" | "overlay") => void;
 viewBox?: { width: number; height: number };
}) {
	const { t } = useTranslation("card-creator");
	const CardOverlay = useCardCreator((state) => state.CardOverlay);
	const setOverlay = useCardCreator((state) => state.setOverlay);

	return (
		<div>
			<div className="block text-sm font-medium text-muted mb-1">
				{t("card_creator.overlay_label")}
			</div>
			<ImageUpload
				onImageSelect={(image) => {
					void setOverlay(image, viewBox);
					if (image) setPositioningLayer("overlay");
				}}
			/>
			{CardOverlay && (
				<button
					type="button"
					aria-pressed={positioningLayer === "overlay"}
					onClick={() => setPositioningLayer("overlay")}
					className={`mt-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
						positioningLayer === "overlay"
							? "bg-primary text-white"
							: "border border-border text-body hover:border-primary"
					}`}
				>
					{t("card_creator.position_overlay")}
				</button>
			)}
		</div>
	);
}
