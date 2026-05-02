import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getLinksByUser } from "@/features/links/presentation/actions";

export type Links = ReturnTypeWithoutPromise<typeof getLinksByUser>[0];
