import { useSignupMutation } from "@/api/auth/authApi";
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
import signupSchema, { SignupSchemaType } from "@/schema/signupSchema";
import { ApiError } from "@/types/api";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function SignUp() {
  const { setAccessToken } = useAccessToken();
  const modals = useModals();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSignup = async (data: SignupSchemaType) => {
    const { name, email, password } = data;
    const res = await signup({ name, email, password });

    if (res.error) {
      toast.error((res.error as ApiError).message || "Failed to sign up");
      return;
    }

    setAccessToken(res.data.data.access_token);
    modals.close({
      at: "/",
      viewTransition: true,
    });
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Sign Up</AlertDialogTitle>
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
            Please fill the form to sign up.
          </p>
          <AutoForm
            schema={signupSchema}
            onFormInit={(form) => form.setFocus("name")}
            onSubmit={handleSignup}
            uiComponents={{
              SubmitButton: () => (
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Sign Up
                </Button>
              ),
            }}
            withSubmit
          >
            <p className="text-black text-sm">
              Already have an account?. Login{" "}
              <span
                role="button"
                className="underline font-semibold"
                onClick={() => {
                  modals.open("/login", { flushSync: true });
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
