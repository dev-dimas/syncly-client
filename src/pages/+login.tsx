import { useLoginMutation } from "@/api/auth/authApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import useAccessToken from "@/hooks/useAccessToken";
import { useModals } from "@/router";
import loginSchema, { LoginSchemaType } from "@/schema/loginSchema";
import { ApiError } from "@/types/api";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const { setAccessToken } = useAccessToken();
  const modals = useModals();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: LoginSchemaType) => {
    const res = await login(data);

    if (res.error) {
      toast.error((res.error as ApiError).message);
      return;
    }

    setAccessToken(res.data.data.access_token);
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Login</AlertDialogTitle>
          <Button
            className="min-h-0 min-w-0 p-1 rounded-full m-0 aspect-square w-4 h-4 absolute top-4 right-4"
            variant="ghost"
            onClick={() =>
              modals.close({
                at: "/",
                replace: true,
                viewTransition: true,
              })
            }
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm sm:text-xs font-medium">
            Please login to your account.
          </p>
          <AutoForm
            schema={loginSchema}
            onFormInit={(form) => form.setFocus("email")}
            uiComponents={{
              SubmitButton: () => (
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Login
                </Button>
              ),
            }}
            onSubmit={handleLogin}
            withSubmit
          >
            <p className="text-black text-sm">
              Don't have an account?. Sign up{" "}
              <span
                role="button"
                className="underline font-semibold"
                onClick={() => {
                  modals.open("/sign-up", { flushSync: true });
                }}
              >
                here
              </span>
              .
            </p>
          </AutoForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
