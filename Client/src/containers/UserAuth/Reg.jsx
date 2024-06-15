import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Reg = ({ signup, isAuthenticated, error }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  // const navigate = useNavigate();
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });


  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === re_password) {     
        signup(name, email, password, re_password);
        setIsLoading(false);
    }
    else {
      setErrorMessage("Password and Confirm password doesn't match");
      setIsLoading(false);
    }

  };

  useEffect(() => {
    if (error) {
      setAccountCreated(false);
      setErrorMessage(error.error);
      // if (error == "OK"){
      //   setAccountCreated(true);
      // }
      // if (error.hasOwnProperty("email")) {
      //   setErrorMessage("");
      //   error.email.map((mes) => {
      //     setErrorMessage((prevmes) => prevmes + " " + mes);
      //   });
      //   setIsLoading(false);
      // } else if (error.hasOwnProperty("password")) {
      //   setErrorMessage("");
      //   error.password.map((mes) => {
      //     setErrorMessage((prevmes) => prevmes + " " + mes);
      //   });
        setIsLoading(false);
    }
  }, [error]);
  // if (isAuthenticated) {
  //   navigate("/");
  // }
  // if (accountCreated) {
  //   navigate(`/login/notverified`);
  // }


  return (
    <div className="flex justify-center items-center rounded my-10 w-[100%]">
      <div className="flex bg-primary text-background border-slate-500 rounded-lg pt-16 pl-8 pr-8 pb-10 shadow-lg bg-opacity-50 text-sm/[40px] xl:w-[40%] xl:min-w-[600px] w-[100%] sm:w-[80%]">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="mx-auto sm:w-[80%] w-[80%]"
        >
          <h1 className="text-3xl font-semibold pb-1">Create Account</h1>

          <div className="relative mt-2 flex text-[18px] flex-wrap flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              User Name
            </label>
            <Input
              type="text"
              className="mt-1 block w-full xl:w-[100%] px-3 py-2 border  rounded-md text-sm shadow-sm text-primary"
              placeholder="user name"
              required
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
            <FaRegUser className=" absolute top-4 right-4" />
          </div>
          <div className="relative my-2 flex text-[18px] flex-wrap flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              Email
            </label>
            <Input
              type="email"
              className="mt-1 block w-full xl:w-[100%] px-3 py-2  rounded-md text-sm shadow-sm text-primary"
              placeholder="email"
              required
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <MdOutlineMail className="absolute top-4 right-4" />
          </div>
          <div className="relative my-2 flex flex-wrap text-[18px] flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              {" "}
              Password
            </label>
            <Input
              type="password"
              className=" mt-1 block w-full xl:w-[100%] px-3 py-2 rounded-md text-sm shadow-sm text-primary"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <RiLockPasswordLine className="absolute top-4 right-4" />
          </div>

          <div className="relative my-2 flex flex-wrap text-[18px] flex-col ">
            <label htmlFor="" className="font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              className=" mt-1 block w-full xl:w-[100%] px-3 py-2 rounded-md text-sm shadow-sm text-primary"
              placeholder="password"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              required
            />
            <RiLockPasswordLine className="absolute top-4 right-4" />
          </div>

          <div className="flex gap-4 text-[18px] align-middle py-3 flex-col ">
            <div className="italic text-lg text-red-500">
              {errorMessage}
            </div>
            
            {isLoading? <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </Button> : <Button
              type="submit"
              className="w-full rounded-lg bg-accent text-white py-1 transition-colors duration-200 font-medium hover:bg-background hover:text-primary"
            >
              Sign Up
            </Button>}
          
          </div>
          <div className="text-lg py-8 font-medium">
            <p>
              {" "}
              Already have Account?{" "}
              <NavLink to="/" className="text-primary-foreground cursor-pointer">
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { signup })(Reg);
