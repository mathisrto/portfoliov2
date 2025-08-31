import { redirect } from "next/navigation";

export default async function LocaleRootPage({
    params,
}: {
    params: { locale: string };
}) {
    const { locale } = await params;

    // Redirige vers /[locale]/about
    redirect(`/${locale}/about`);
}
