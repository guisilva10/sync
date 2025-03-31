/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import { EditLinkForm } from "../../(main)/_components/edit-link-sheet";
import { getLink } from "../../new/actions";

export default async function EditLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await (await params).id;
  const linkData = await getLink(id);
  if (!linkData) {
    throw new Error("Link data not found");
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          Editar Link: {linkData.title}
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="mx-auto py-12">
        <EditLinkForm id={id} initialData={linkData as any} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
