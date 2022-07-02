import { Input } from "../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { RefreshIcon } from "@heroicons/react/outline";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório!"),
  email: yup
    .string()
    .email("E-mail inválido!")
    .required("E-mail é obrigatório!"),
  password: yup
    .string()
    .required("Senha é obrigatório!")
    .min(6, "Mínimo de seis caracteres!"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Senhas não coincidem!"),
});

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleCreateUser = async ({ name, email, password }) => {
    try {
      await signUp({ name, email, password });
      navigate("/signin");
    } catch (err) {
      toast(err.message, {
        autoClose: 3000,
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    } finally {
      reset();
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center px-6">
      <div className="bg-white min-w-[300px] rounded-2xl p-8 text-gray-900">
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="flex w-full flex-col gap-4 items-center"
        >
          <Input
            type="text"
            placeholder={"Nome"}
            name="name"
            error={errors.name}
            {...register("name")}
          />
          <Input
            type="email"
            placeholder={"E-mail"}
            name="email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            type="password"
            placeholder={"Senha"}
            name="password"
            error={errors.password}
            {...register("password")}
          />
          <Input
            type="password"
            placeholder={"Confirmar senha"}
            name="password_confirmation"
            error={errors.password_confirmation}
            {...register("password_confirmation")}
          />

          <button
            type="submit"
            className="flex items-center justify-center mt-2 h-14 rounded bg-brand-blue w-full text-white text-lg font-bold hover:brightness-90 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <RefreshIcon className="h-7 w-7 animate-spin" />
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
