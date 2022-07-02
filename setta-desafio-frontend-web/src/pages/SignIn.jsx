import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { RefreshIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido!")
    .required("E-mail é obrigatório!"),
  password: yup
    .string()
    .required("Senha é obrigatório!")
    .min(6, "Mínimo de seis caracteres!"),
});

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignIn = async ({ email, password }) => {
    try {
      await signIn({ email, password });
      navigate("/");
    } catch (err) {
      toast(err.message, {
        autoClose: 3000,
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex  h-screen w-full items-center justify-center  px-6">
      <div className="bg-white min-w-[300px]  rounded-2xl p-8 text-gray-900">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex w-full flex-col gap-4 items-center"
        >
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

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-2 h-14 rounded bg-brand-blue w-full text-white text-lg font-bold hover:brightness-90 transition-all"
          >
            {isSubmitting ? (
              <RefreshIcon className="h-7 w-7 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-gray-900 text-opacity-80 mt-6">
          Cadastre-se{" "}
          <Link to={"/signup"} className="text-brand-blue">
            aqui
          </Link>
          !
        </p>
      </div>
    </div>
  );
};
