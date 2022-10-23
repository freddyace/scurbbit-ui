import { useState } from "react";

export const useForm = (options) => {
  const [dataz, setData] = useState(options?.initialValues || {});
  const [errorsz, setErrors] = useState({});
  const handleChangez = (key, sanitizeFn, e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...dataz,
      [key]: value,
    });
  };
  const clearErrors = () => {
    setErrors({});
  };
  const emailIsValid = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitz = async (e, callback) => {
    if (e) {
      e.preventDefault();
    }
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = dataz[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !emailIsValid(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }
        const length = validation?.length?.value;
        if (length && value?.length < length) {
          valid = false;
          newErrors[key] = validation?.length?.message;
        }
        const match = validation?.match?.value;
        const passwordInput = dataz["password"];
        if (match && value && passwordInput && value !== passwordInput) {
          valid = false;
          newErrors[key] = validation?.match?.message;
        }
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors, callback);
        return;
      }
    }

    setErrors({}, callback);
    // don't need this yet
    // if (options?.onSubmit) {
    //   options.onSubmit();
    // }
  };

  return {
    dataz,
    handleChangez,
    handleSubmitz,
    errorsz,
    clearErrors,
  };
};
