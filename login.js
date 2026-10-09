const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btn-login");

// عند الضغط

loginButton.addEventListener("click", loginUser);

async function loginUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // التحقق
  if (email === "" || password === "") {
    alert("اكمل البيانات");
    return;
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("البريد الألكتروني او كلمه المرور غير صحيحه");
    return;
  }

  localStorage.setItem("userId", data.userId);
  alert("تم تسجيل الدخول");
  window.location.href = "dashboard.html";
}
