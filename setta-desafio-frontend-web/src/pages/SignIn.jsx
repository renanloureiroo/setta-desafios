import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { WrapperGradient } from "../components/WrapperGradient";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

  const { singIn } = useAuth();

  return (
    <WrapperGradient>
      <div className="flex w-full h-full items-center justify-center px-6">
        <div className="bg-white min-w-[300px] rounded-2xl p-8 text-gray-900">
          <form
            onSubmit={handleSubmit(singIn)}
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
              type="submit"
              className="mt-2 h-14 rounded bg-brand-blue w-full text-white text-lg font-bold hover:brightness-90 transition-all"
            >
              Entrar
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
    </WrapperGradient>
  );
};
