const formValidator = (form, fieldsConfig, onValidateSuccess, onValidationError) => {

    const validateField = (fieldElement, fieldConfig) => {
      const value = fieldElement.value;
      const rules = fieldConfig.rules;
      const formGroup = fieldElement.closest('.form-group');
      const errorElement = formGroup.querySelector('.form-error-message');
      const personalNumber = document.querySelector("#personal_number");
      const mobileNumber = document.querySelector("#mobile_number");
  
      const fieldValidationResult = {name: fieldConfig.name, value: value, errors: []};
      rules.forEach(rule => {
        if (rule.required && !value) {
          fieldValidationResult.errors.push(rule.message);
        }
        if (rule.maxLength && `${value}`.length > rule.maxLength) {
          fieldValidationResult.errors.push(rule.message);
        }
      });
  
      if(fieldValidationResult.errors.length > 0){
        errorElement.innerText = fieldValidationResult.errors.join('\n');
      } else {
        errorElement.innerText = '';
      }
    //   console.log(fieldValidationResult);
  
      return fieldValidationResult;
    }
  
    const validateOnChange = () => {
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        fieldElement.addEventListener('input', e => {
          validateField(e.target, fieldConfig);
        });
      })
    }
    
    if (personalNumber.value.length === 11) {
      setSuccessFor(personalNumber);
    } else {
      setErrorFor(personalNumber, "Personal number must contain 11 digit");
    }
    
    if (mobileNumber.value.length == 9) {
      setSuccessFor(mobileNumber);
    } else if (mobileNumber.value.length == 13) {
      let firstCharacter = mobileNumber.value.slice(0, 1);
      if (firstCharacter === "+") {
        setSuccessFor(mobileNumber);
      }
    } else {
      setErrorFor(mobileNumber, "Mobile number must contain 9 or 13 digit");
    }
  }
  
    const validateOnSubmit = () => {
      const validatedFields = [];
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        validatedFields.push(validateField(fieldElement, fieldConfig));
      });
  
      return validatedFields;
    }
  
    const listenFormSubmit = () => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit');
        const errors = [];
        const validationResult = validateOnSubmit();
        validationResult.forEach(result => {
          errors.push(...result.errors);
        });
        if(errors.length === 0){
          onValidateSuccess(validationResult);
        }else {
          onValidationError(validationResult);
        }
        console.log(validationResult);
      });
    }
    listenFormSubmit();
    validateOnChange();
  
  
  const fieldsConfig = [
    {
      name: 'first_name',
      rules: [
        {required: true, message: 'First name is required.'},
        {maxLength: 10, message: 'სიბოლოების რაოდენობა უნდა იყოს 10 ზე ნაკლები ან ტოლი'},
      ]
    },
    {
      name: 'last_name',
      rules: [
        {required: true, message: 'Last name is required.'},
      ]
    },
    {
        name: 'personal_number',
        rules: [
            {required: true, messsage: 'personal number is required'},
            {maxLength: 11, message: 'სიმბოლოების რაოდენობა უნდა იყოს 11'},
        ]
    },
    {
        name:'mobile_number',
        rules: [
            {required: true, message: 'please enter your mobile number'},
            {maxLength:13, message: 'მობილურის ნომერი უნდა შეიცავდეს 9 ან 13 სიმბოლოს' },
            {type: 'number', message: 'please enter your mobile number'}
        ]

    },
    {
      name: 'zip_code',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    }
  ];
  
  
  const form = document.querySelector('#user-registraion-form');
  
  const onFormSubmitSuccess = (fields) => {
    console.log('We can send data to server', fields);
  }
  const onFormSubmitError = (fields) => {
    console.log('Error', fields);
  }
  
  formValidator(form, fieldsConfig, onFormSubmitSuccess, onFormSubmitError);
  