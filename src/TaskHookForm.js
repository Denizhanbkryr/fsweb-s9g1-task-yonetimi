import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
      id: nanoid(5),
    },
    mode: "onChange",
  });

  const onSubmit = (data, event) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    event.target.reset();
  };

  const validatePeople = (value) => {
    if (value.length < 1) {
      return "Lütfen en az bir kişi seçin";
    }
    if (value.length > 3) {
      return "En fazla 3 kişi seçebilirsiniz";
    }
  };
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: validatePeople,
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}

/*const notify = () => toast("Wow so easy!");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      isim: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    })
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Başlık:
        <input
          rows="1"
          id="başlık"
          name="başlık"
          {...register("başlık", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Başlık en az 3 karakter içermelidir",
            },
          })}
        ></input>
      </label>
      {errors.mesaj && <p>{errors.mesaj.message}</p>}

      <label>
        Açıklama:
        <textarea
          rows="3"
          id="açıklama"
          name="açıklama"
          {...register("açıklama", {
            required: "Açıklama boş bırakılamaz",
            minLength: {
              value: 10,
              message: "Açıklama en az 10 karakter içermelidir",
            },
          })}
        ></textarea>
      </label>
      {errors.açıklama && <p>{errors.açıklama.message}</p>}
      <div>
        <button type="submit" disabled={!isValid} onClick={notify}>
          Gönder
        </button>
        <ToastContainer />
      </div>

      <label>
        İsim:
        <input
          type="text"
          name="isim"
          {...register("isim", { required: "İsim boş bırakılamaz" })}
        />
      </label>
      <div>
        <button type="submit" onClick={notify}>
          Gönder
        </button>
        <ToastContainer />
      </div>

      {errors.isim && <p>{errors.isim.message}</p>}
    </form>
  );*/
