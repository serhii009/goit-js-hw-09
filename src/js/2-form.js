const formData ={
  email: "",
  message: "", 
} ;

const form = document.querySelector(".feedback-form");
form.addEventListener("input", onFormInput);
function onFormInput(event) {
  const {name, value} = event.target;
  
  formData[name] = value.trim();

  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

const savedFormData = localStorage.getItem("feedback-form-state");
if (savedFormData) {
  const parsedFormData = JSON.parse(savedFormData);
  formData.email = parsedFormData.email || "";
  formData.message = parsedFormData.message || "";
  form.email.value = formData.email;
  form.message.value = formData.message;
}

form.addEventListener("submit", onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  } 
  console.log(formData);
  localStorage.removeItem("feedback-form-state");
  
  formData.email = "";
  formData.message = "";
  form.reset();
}