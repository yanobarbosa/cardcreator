import { useCardCreator } from "@fabkit/apps/card-creator/stores/card-creator.ts";
import ImageUpload from "@fabkit/platform/components/form/ImageUpload";
import { useTranslation } from "react-i18next";

export function CardArtworkField({
	positioningLayer,
	setPositioningLayer,
}: {
	positioningLayer: "artwork" | "overlay";
	setPositioningLayer: (layer: "artwork" | "overlay") => void;
}) {
	const { t } = useTranslation("card-creator");
	const setCardArtwork = useCardCreator((state) => state.setCardArtwork);
	const CardArtwork = useCardCreator((state) => state.CardArtwork);

	return (
		<div>
			<div className="block text-sm font-medium text-muted mb-1">
				{t("card_creator.artwork_label")}
			</div>
			<ImageUpload
				onImageSelect={(image) => {
					void setCardArtwork(image);
					if (image) setPositioningLayer("artwork");
				}}
			/>
			{CardArtwork && (
				<button
					type="button"
					aria-pressed={positioningLayer === "artwork"}
					onClick={() => setPositioningLayer("artwork")}
					className={`mt-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
						positioningLayer === "artwork"
							? "bg-primary text-white"
							: "border border-border text-body hover:border-primary"
					}`}
				>
					{t("card_creator.position_artwork")}
				</button>
			)}
		</div>
	);
}
