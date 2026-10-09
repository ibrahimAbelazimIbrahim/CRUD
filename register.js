const nameInput = document.getElementById("name");
const  emailInput = document.getElementById("email");
const  passwordInput = document.getElementById("password");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");
//Button 
const  registerButton = document.getElementById("btn-register");


// عند الضغط على زر انشاء حساب 
registerButton.addEventListener("click", registerUser);


// داله إنشاء مستخدم جديد
async function registerUser() {

    // قراءى البيانات من الصفحة
    const name = nameInput.value ;
    const  email = emailInput.value ;
    const  password = passwordInput.value ;
    const  age = ageInput.value ;
    const  phone= phoneInput.value ;
    
// التحقق من ان جميع البيانات غير فارغه
if (
    name === "" ||
    email === "" ||
    password === "" ||
    age === "" ||
    phone === "" 
){
alert ("من فضلك اكمل جميع البيانات")
}
    
// ارسال البيانات الى Supabase
const {data, error} = await supabaseClient
.from("users")
.insert([
{

name: name,
email: email,
password: password,
age: age,
phone: phone

}  
 ])

 // خطأ

 if (error){
    alert(error.message);
    return;
 }

// نجاح
alert("تم انشاء الحساب بنجاح")


// تنظيف الحقول 
nameInput.value = ""
 emailInput.value = ""
 passwordInput.value = ""
ageInput.value = ""
phoneInput.value = ""




} // نهاية داله انشاء المستخدم