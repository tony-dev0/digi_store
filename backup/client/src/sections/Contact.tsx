import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z
    .string()
    .min(5, { message: "title too short" })
    .max(50, { message: "title too long" }),
  message: z.string().min(20),
});

type FormFields = z.infer<typeof schema>;
// write a function to control multiple submissions at small time
export const Contact = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    setloading(true);
    let semail = "null";
    let sstatus = "null";
    const date = Date.now();
    if (currentUser) {
      semail = currentUser.email;
      sstatus = "active";
    }
    setTimeout(() => {
      axios
        .post("/api/notifications/in", {
          name: data.name,
          email: data.email,
          title: data.title,
          message: data.message,
          semail: semail,
          sstatus: sstatus,
          date: date,
        })
        .then(() => {
          setloading(false);
          toast.success("Message sent. You will get a Response within 24hrs");
        })
        .catch((error) => {
          setError("root", {
            message: error.response.data || "An error occurred",
          });
        });
    }, 3000);
  };
  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="rbf">Contact Now</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <form
                id="request"
                className="main_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                {errors.root && (
                  <div className="alert alert-danger" role="alert">
                    {errors.root.message}
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <div className="inputBox">
                      <input
                        {...register("name")}
                        className="contactus"
                        placeholder="Name"
                        type="text"
                      />
                      {errors.name && (
                        <div style={{ color: "tomato" }}>
                          {" "}
                          {errors.name.message}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inputBox">
                      <input
                        {...register("email")}
                        className="contactus"
                        placeholder="Email"
                        type="email"
                      />
                      {errors.email && (
                        <div style={{ color: "tomato" }}>
                          {" "}
                          {errors.email.message}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="inputBox">
                      <input
                        {...register("title")}
                        className="contactus"
                        placeholder="Subject"
                        type="text"
                      />
                      {errors.title && (
                        <div style={{ color: "tomato" }}>
                          {" "}
                          {errors.title.message}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="inputBox">
                      <textarea
                        {...register("message")}
                        className="textarea"
                        placeholder="Message"
                      />
                      {errors.message && (
                        <div style={{ color: "tomato" }}>
                          {" "}
                          {errors.message.message}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p className="text-center">
                      <button
                        className="btn btn-success py-3 w-50 rounded-3"
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? "SUBMITTING..." : "SUBMIT"}
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
