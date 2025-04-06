"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import { updateProfileSchema } from "../schema";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { SheetFooter } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Session } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { toast } from "@/app/_components/ui/use-toast";
import { Check } from "lucide-react";

type ProfileFormProps = {
  defaultValues: Session["user"] | undefined;
};

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data);
    router.refresh();

    toast({
      title: "Perfil Editado!",
      description: "Seu perfil foi atualizado com sucesso.",
      action: <Check className="size-4 text-emerald-500" />,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nome</CardTitle>
            <CardDescription>
              Este será o seu nome exibido publicamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Insira um novo email, ou permaneça com este.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto mr-0 ml-auto w-fit">
          <Button disabled={form.formState.isLoading} type="submit">
            {form.formState.isSubmitting && "Salvando..."}
            {!form.formState.isSubmitting && "Salvar Alterações"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
