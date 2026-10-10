import { useTranslation } from "react-i18next";

export function Footer() {
	const { t } = useTranslation("platform");

	return (
		<footer className="sticky top-[100vh] z-10 border-t border-t-primary bg-surface pt-3 lg:pl-72">
			<div className="mx-auto max-w-7xl px-6 pb-5 md:flex md:items-center md:justify-between lg:px-8">
				<div>
					<p className="mt-8 text-left text-sm/6 text-primary md:order-1 md:mt-0">
						{t("footer.disclaimer")}
					</p>
				</div>
			</div>
		</footer>
	);
}
