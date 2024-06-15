import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
const LoginPage = ({ user, login, isAuthenticated, error }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { verified } = useParams();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        console.log(user);
        setIsLoading(false);
      }
    }
    if (error) {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-24 flex-wrap">
      <div className="flex gap-2">
        {user ? (
          <div className="text-6xl font-semibold leading-snug pr-10">
            Welcome {user.user}
            <br /> <br />
            <p className="back-wave h-40"></p>
          </div>
        ) : (
          <div className="text-6xl font-semibold leading-snug pr-10">
            Login to
            <br /> EarXScore Now <br />
            <p className="back-wave h-40"></p>
          </div>
        )}
       
        <img
          src="/images/ManShowingSmartphone-ezgif.com-crop.gif"
          alt=""
          className="h-96 pr-8"
        />
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-y-2 border-y-secondary">
        {verified == "notverified" ? (
          <div className="w-full p-4 bg-purple-300 text-blue-950 ">
            An Activation link has been sent to your email, Please activate your
            account by clicking the link inorder to be able to login.
          </div>
        ) : (
          ""
        )}
        {verified == "verified" ? (
          <div className="w-full p-4 bg-purple-300 text-blue-950 ">
            You have successfully activated your account, you can now login
          </div>
        ) : (
          ""
        )}
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
            Your Account
          </h1>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-4 md:space-y-6"
          >
            <div className="relative mt-10 flex text-[18px] flex-wrap flex-col">
              <label htmlFor="" className="w-[110px] font-medium">
                Email
              </label>
              <div class="relative my-1">
                <Input
                  type="email"
                  class="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineMail className="" />
                </span>
              </div>
            </div>
            <div className="relative my-7 flex flex-wrap text-[18px] flex-col">
              <label htmlFor="" className="w-[110px] font-medium">
                {" "}
                Password
              </label>
              <div class="relative my-1">
                <Input
                  type="password"
                  class="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RiLockPasswordLine className="" />
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-[18px] align-middle py-3 flex-col">
              <div className=" italic text-red-500 text-lg ">
                {error ? error.error : ""}
              </div>

              {isLoading ? (
                <Button disabled className=" bg-muted-foreground text-muted">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-muted-foreground text-muted py-1 transition-colors duration-300 font-medium hover:text-muted-foreground hover:bg-muted "
                >
                  Login
                </Button>
              )}

              <div className="w-full text-primary text-right mr-4 font-medium">
                <NavLink to="/reset-password">Forgot Password?</NavLink>
              </div>
            </div>
            <div className="text-lg py-1 font-medium">
              <p>
                {" "}
                New to EarScore?{" "}
                <NavLink to="/signup" className="text-primary sm:mx-3">
                  Create Account
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(LoginPage);
