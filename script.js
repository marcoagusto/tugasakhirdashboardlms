document.addEventListener("DOMContentLoaded", () => {
  // Elemen-elemen Dashboard yang akan dimanipulasi
  const userGreeting = document.getElementById("user-greeting");
  const sectionPriorityTasks = document.getElementById(
    "section-priority-tasks"
  );
  const upcomingTasksCount = document.getElementById("upcoming-tasks-count");
  const noPriorityTasksMessage = document.getElementById("no-priority-tasks");
  const priorityTasksList = document.getElementById("priority-tasks-list");

  // Hapus baris ini karena kita tidak lagi menggunakan elemen progress bar lama
  // const overallProgressBar = document.getElementById("overall-progress-bar");
  // const overallProgressText = document.getElementById("overall-progress-text");

  const totalTasksCompleted = document.getElementById("total-tasks-completed");
  const totalMaterialsAccessed = document.getElementById(
    "total-materials-accessed"
  );
  const totalTasksAll = document.getElementById("total-tasks-all");
  const totalMaterialsAll = document.getElementById("total-materials-all");
  const overallProgressSummary = document.getElementById(
    "overall-progress-summary"
  );

  // Course specific elements (assuming their IDs from HTML)
  const courseJejaringSosialDiv = document.getElementById(
    "course-jejaring-sosial"
  );
  const courseMesinDiv = document.getElementById("course-pembelajaran-mesin");
  const courseTugasAkhirDiv = document.getElementById("course-tugas-akhir");
  const coursePemWebDiv = document.getElementById("course-pemrograman-web");
  const courseMathDiv = document.getElementById("course-math");

  const userLevel = document.getElementById("user-level");
  const userPoints = document.getElementById("user-points");
  const badgeFirstQuiz = document.getElementById("badge-first-quiz");
  const badgeConsistent = document.getElementById("badge-consistent");
  const badgeMaster = document.getElementById("badge-master");
  const badgeFastLearner = document.getElementById("badge-fast-learner");

  const messageBadge = document.getElementById("message-badge");
  const forumBadge = document.getElementById("forum-badge");
  const notificationDot = document.getElementById("notification-dot");

  const sectionWarningsSolutions = document.getElementById(
    "section-warnings-solutions"
  );
  const warningsList = document.getElementById("warnings-list");
  const brokenMaterialItem = document.getElementById("broken-material-item");
  const newQuizMaterialItem = document.getElementById("new-quiz-material-item");

  const leaderboardSection = document.getElementById("leaderboard-section");
  const leader1 = document.getElementById("leader-1");
  const score1 = document.getElementById("score-1");
  const leader2 = document.getElementById("leader-2");
  const score2 = document.getElementById("score-2");

  const messageDosenSection = document.getElementById("message-dosen-section");
  const dosenStatistikaStatus = document.getElementById(
    "dosen-statistika-status"
  );
  const dosenStatistikaText = document.getElementById("dosen-statistika-text");
  const dosenMessagesPreview = document.getElementById(
    "dosen-messages-preview"
  );

  const sectionSimpleGuide = document.getElementById("section-simple-guide");
  const toggleGamificationBtn = document.getElementById("toggle-gamification");
  const gamificationSection = document.getElementById("gamification-section");

  // Sidebar elements
  const rightSidebar = document.getElementById("right-sidebar");
  const rightSidebarToggle = document.getElementById("right-sidebar-toggle"); // The clickable area for collapsed state
  const rightSidebarFullContent = document.getElementById(
    "right-sidebar-full-content"
  );
  const rightSidebarCloseBtn = document.getElementById(
    "right-sidebar-close-btn"
  ); // Unified close button
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarPushContentPadding = document.getElementById(
    "sidebar-push-content-padding"
  );

  // Tambahkan variabel untuk Chart.js
  const overallProgressChartCtx = document.getElementById(
    "overallProgressChart"
  );
  let overallProgressDonutChart; // Untuk menyimpan instance chart

  // --- Data untuk mengisi dashboard (kondisi penuh fitur/akhir skenario) ---
  let dashboardState = {
    currentUser: "Rizky",
    tasks: [
      {
        id: "task-1",
        name: "Quiz Week 3",
        course: "Analisis Jejaring Sosial",
        deadline: "3 Days Left",
        completed: false,
        category: "quiz",
      },
    ],
    courseProgress: {
      "Analisis Jejaring Sosial": {
        materials: 8,
        totalMaterials: 10,
        tasksCompleted: 4,
        totalTasks: 5,
      },
      "Pembelajaran Mesin": {
        materials: 10,
        totalMaterials: 12,
        tasksCompleted: 3,
        totalTasks: 3,
      },
      "Tugas Akhir": {
        materials: 1,
        totalMaterials: 10,
        tasksCompleted: 0,
        totalTasks: 1,
      },
      "Pemrograman Web": {
        materials: 10,
        totalMaterials: 12,
        tasksCompleted: 3,
        totalTasks: 3,
      },
      "Matematika Diskret": {
        materials: 4,
        totalMaterials: 7,
        tasksCompleted: 1,
        totalTasks: 1,
      },
    },
    overallTotals: {
      completedTasks: 8,
      totalTasks: 10,
      accessedMaterials: 30,
      totalMaterials: 35,
      overallPercentage: 75,
    },
    level: 5,
    points: 2500,
    badges: {
      firstQuiz: true,
      consistent: true,
      master: true,
      fastLearner: true,
    },
    leaderboard: [
      { name: "Mahasiswa A", score: 2500, isCurrentUser: false },
      { name: "Mahasiswa B", score: 2200, isCurrentUser: true },
      { name: "Mahasiswa C", score: 2000, isCurrentUser: false },
      { name: "Mahasiswa D", score: 1800, isCurrentUser: false },
      { name: "Mahasiswa E", score: 1700, isCurrentUser: false },
    ],
    warnings: [
      {
        type: "broken_link",
        message:
          "<strong>Broken Link:</strong> The material 'Social Network Analysis - Week 3' is currently inaccessible. Our support team has received the report and is following up. The course instructor has been notified.",
      },
      {
        type: "new_quiz",
        message:
          "<strong>New:</strong> A new Analisis Jejaring Sosial Quiz has been released – Deadline in 3 days.",
      },
    ],
    dosenOnline: true,
    dosenChatHistory: `
            <p class="text-text-standard"><strong>Dosen Statistika:</strong> Halo Rizky, konsep Statistika yang mana? Saya online sekarang.</p>
            <p class="text-text-standard"><strong>Rizky:</strong> Tentang distribusi normal, Pak. Saya masih bingung penerapannya.</p>
            <p class="text-text-standard"><strong>Dosen Statistika:</strong> Baik, kita bisa konsultasi singkat via video call, mau sekarang?</p>
        `,
    messageNotificationCount: 1,
    forumNotificationCount: 5,
  };

  // --- Helper function to manage element visibility ---
  const setVisibility = (element, isVisible, displayType = "block") => {
    if (element) {
      if (isVisible) {
        element.classList.remove("hidden");
        // Ensure correct display type is set, if different from default block
        if (
          element.id === "learning-progress-overview" ||
          element.id === "badges-container" ||
          (element.tagName === "DIV" && element.classList.contains("flex"))
        ) {
          element.style.display = "flex"; // For flex containers
          if (element.classList.contains("grid"))
            element.style.display = "grid"; // For grid containers
        } else {
          element.style.display = displayType; // Default to block
        }
        element.classList.add("element-visible");
        element.classList.remove("element-hidden");
      } else {
        element.classList.add("hidden");
        element.style.display = "none";
        element.classList.remove("element-visible");
        element.classList.add("element-hidden");
      }
    }
  };

  // --- Right Sidebar Toggle Functions ---
  // Start with sidebar closed on desktop, full on mobile
  let isRightSidebarOpen = false;

  const openRightSidebar = () => {
    isRightSidebarOpen = true;
    rightSidebar.classList.add("sidebar-open");
    rightSidebar.classList.remove("sidebar-closed");

    if (window.innerWidth >= 768) {
      // Desktop
      setVisibility(rightSidebarFullContent, true);
      setVisibility(rightSidebarToggle, false); // Keep toggle visible
      sidebarPushContentPadding.style.width = "280px"; // Expand padding
    } else {
      // Mobile
      setVisibility(rightSidebarFullContent, true);
      setVisibility(sidebarOverlay, true);
      document.body.style.overflow = "hidden"; // Sembunyikan scrollbar body saat sidebar mobile terbuka
    }
  };

  const closeRightSidebar = () => {
    isRightSidebarOpen = false;
    rightSidebar.classList.remove("sidebar-open");
    rightSidebar.classList.add("sidebar-closed");

    if (window.innerWidth >= 768) {
      // Desktop
      setVisibility(rightSidebarFullContent, false);
      setVisibility(rightSidebarToggle, true); // Keep toggle visible
      sidebarPushContentPadding.style.width = "50px"; // Collapse padding
    } else {
      // Mobile
      setVisibility(rightSidebarFullContent, false);
      setVisibility(sidebarOverlay, false);
      document.body.style.overflow = ""; // Kembalikan scrollbar body saat sidebar mobile tertutup
    }
  };

  // --- Fungsi utama untuk mengisi dan menampilkan dashboard ---
  const initializeDashboardState = () => {
    // User Greeting
    if (userGreeting) {
      userGreeting.textContent = `Hi, ${dashboardState.currentUser}!`;
    }

    // Prioritas Tugas (Timeline)
    priorityTasksList.innerHTML = "";
    if (dashboardState.tasks.length > 0) {
      dashboardState.tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.id = task.id;
        taskItem.className = `flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-xl shadow-sm border upcoming-task`;
        taskItem.innerHTML = `
                    <div class="flex-1 mb-3 md:mb-0">
                        <h3 class="text-lg font-semibold text-text-standard">${task.name}</h3>
                        <p class="text-sm text-text-secondary">${task.course}</p>
                        <span class="text-sm font-bold text-red-600 mt-1 block">
                            <i class="fas fa-hourglass-half mr-2"></i>Deadline: ${task.deadline}
                        </span>
                    </div>
                    <button class="bg-main-accent text-white px-4 py-2 rounded-lg hover:bg-hover-accent transition-colors duration-200 shadow-md">
                        Attempt quiz now
                    </button>
                `;
        priorityTasksList.appendChild(taskItem);
      });
      setVisibility(priorityTasksList, true);
      setVisibility(noPriorityTasksMessage, false);
      if (upcomingTasksCount) {
        upcomingTasksCount.textContent = `${dashboardState.tasks.length} Tugas`;
      }
    } else {
      setVisibility(priorityTasksList, false);
      setVisibility(noPriorityTasksMessage, true);
      upcomingTasksCount.textContent = `0 Tugas`;
      if (upcomingTasksCount) {
        upcomingTasksCount.textContent = `0 Tugas`;
      }
    }

    // Peringatan & Solusi (Always visible in this version)
    if (dashboardState.warnings.length > 0) {
      warningsList.innerHTML = "";
      dashboardState.warnings.forEach((warning) => {
        const li = document.createElement("li");
        li.innerHTML = warning.message;
        warningsList.appendChild(li);
      });
      setVisibility(sectionWarningsSolutions, true);
      setVisibility(brokenMaterialItem, true); // Show broken material link
      setVisibility(newQuizMaterialItem, true); // Show new quiz material
      notificationDot.classList.remove("hidden"); // Show notification dot
    } else {
      setVisibility(sectionWarningsSolutions, false);
      setVisibility(brokenMaterialItem, false);
      setVisibility(newQuizMaterialItem, false);
      notificationDot.classList.add("hidden");
    }


    // Visualisasi Progres Belajar (Per Mata Kuliah)
    const updateCourseCard = (courseDiv, currentCourse) => {
      if (courseDiv && currentCourse) {
        const bar = courseDiv.querySelector(".progress-bar");
        const text = courseDiv.querySelector(".progress-text-overlay");
        const info = courseDiv.querySelector("p:not(.text-sm.mb-2)"); // Exclude dosen name p

        const coursePercentage =
          currentCourse.totalMaterials > 0
            ? Math.round(
              (currentCourse.materials / currentCourse.totalMaterials) * 100
            )
            : 0;

        bar.style.width = `${coursePercentage}%`;
        text.textContent = `${coursePercentage}%`;
        info.textContent = `Materi Selesai: ${currentCourse.materials}/${currentCourse.totalMaterials} | Tugas Selesai: ${currentCourse.tasksCompleted}/${currentCourse.totalTasks}`;

        if (coursePercentage < 40) {
          bar.className = "progress-bar progress-low";
        } else if (coursePercentage < 75) {
          bar.className = "progress-bar progress-medium";
        } else {
          bar.className = "progress-bar progress-high";
        }
        setVisibility(courseDiv, true); // Ensure course is visible
      }
    };

    updateCourseCard(
      courseJejaringSosialDiv,
      dashboardState.courseProgress["Analisis Jejaring Sosial"]
    );
    updateCourseCard(
      courseMesinDiv,
      dashboardState.courseProgress["Pembelajaran Mesin"]
    );
    updateCourseCard(
      courseTugasAkhirDiv,
      dashboardState.courseProgress["Tugas Akhir"]
    );
    updateCourseCard(
      coursePemWebDiv,
      dashboardState.courseProgress["Pemrograman Web"]
    );
    updateCourseCard(
      courseMathDiv,
      dashboardState.courseProgress["Matematika Diskret"]
    );

    // Pencapaian (Badges)
    if (dashboardState.badges.firstQuiz && badgeFirstQuiz) {
      badgeFirstQuiz.classList.remove("locked");
      badgeFirstQuiz.classList.add("unlocked");
    }
    if (dashboardState.badges.consistent && badgeConsistent) {
      badgeConsistent.classList.remove("locked");
      badgeConsistent.classList.add("unlocked");
    }
    if (dashboardState.badges.master && badgeMaster) {
      badgeMaster.classList.remove("locked");
      badgeMaster.classList.add("unlocked");
    }
    if (dashboardState.badges.fastLearner && badgeFastLearner) {
      badgeFastLearner.classList.remove("locked");
      badgeFastLearner.classList.add("unlocked");
    }

    // Gamifikasi (Level, Poin)
    userLevel.textContent = dashboardState.level;
    userPoints.textContent = dashboardState.points;
    setVisibility(gamificationSection, true);

    // Papan Peringkat Semester
    if (dashboardState.leaderboard.length > 0) {
      leader1.textContent = `1. ${dashboardState.leaderboard[0].name}`;
      score1.textContent = `${dashboardState.leaderboard[0].score} Poin`;
      leader2.textContent = `2. ${dashboardState.leaderboard[1].name}`;
      score2.textContent = `${dashboardState.leaderboard[1].score} Poin`;
      setVisibility(leaderboardSection, true);
    } else {
      setVisibility(leaderboardSection, false);
    }

    // Pesan Dosen & Indikator Online
    dosenMessagesPreview.innerHTML = dashboardState.dosenChatHistory;
    if (dashboardState.dosenOnline) {
      dosenStatistikaStatus.classList.remove("bg-gray-400");
      dosenStatistikaStatus.classList.add("bg-green-500");
      dosenStatistikaText.textContent = "Online";
    } else {
      dosenStatistikaStatus.classList.remove("bg-green-500");
      dosenStatistikaStatus.classList.add("bg-gray-400");
      dosenStatistikaText.textContent = "Offline";
    }
    if (dashboardState.messageNotificationCount > 0) {
      messageBadge.textContent = `${dashboardState.messageNotificationCount} Baru`;
      messageBadge.classList.remove("hidden");
      // Also update sidebar message badge if it exists
      if (messageBadge) {
        messageBadge.textContent = `${dashboardState.messageNotificationCount} Baru`;
        messageBadge.classList.remove("hidden");
      }
      const sidebarMessageBadge = document.getElementById(
        "message-badge-sidebar"
      );
      if (sidebarMessageBadge) {
        sidebarMessageBadge.textContent = `${dashboardState.messageNotificationCount} Baru`;
        sidebarMessageBadge.classList.remove("hidden");
      }
    } else {
      messageBadge.classList.add("hidden");
      const sidebarMessageBadge = document.getElementById(
        "message-badge-sidebar"
      );
      if (messageBadge) {
        messageBadge.classList.add("hidden");
      }
      if (sidebarMessageBadge) sidebarMessageBadge.classList.add("hidden");
    }
    if (dashboardState.forumNotificationCount > 0) {
      forumBadge.textContent = `${dashboardState.forumNotificationCount} Baru`;
      forumBadge.classList.remove("hidden");
      // Also update sidebar forum badge if it exists
      if (forumBadge) {
        forumBadge.textContent = `${dashboardState.forumNotificationCount} Baru`;
        forumBadge.classList.remove("hidden");
      }
      const sidebarForumBadge = document.getElementById("forum-badge-sidebar");
      if (sidebarForumBadge) {
        sidebarForumBadge.textContent = `${dashboardState.forumNotificationCount} Baru`;
        sidebarForumBadge.classList.remove("hidden");
      }
    } else {
      // TAMBAHKAN PEMERIKSAAN INI
      if (forumBadge) {
        forumBadge.classList.add("hidden");
      }
    }

    // Other sections (ensure they are visible)
    setVisibility(sectionSimpleGuide, true);
  };

  // Toggle Gamifikasi button functionality (Optional visibility control)
  let isGamificationEnabled = true; // Assume enabled by default for this presentation view
  if (toggleGamificationBtn && gamificationSection) {
    toggleGamificationBtn.addEventListener("click", () => {
      isGamificationEnabled = !isGamificationEnabled;
      if (isGamificationEnabled) {
        setVisibility(gamificationSection, true);
        toggleGamificationBtn.textContent = "Nonaktifkan Gamifikasi";
        // Remove accent colors, add default text color
        toggleGamificationBtn.classList.remove("text-main-accent-text-color");
        toggleGamificationBtn.classList.add("text-text-standard");
      } else {
        setVisibility(gamificationSection, false);
        toggleGamificationBtn.textContent = "Aktifkan Gamifikasi";
        // Add accent colors, remove default text color
        toggleGamificationBtn.classList.remove("text-text-standard");
        toggleGamificationBtn.classList.add("text-main-accent-text-color");
      }
    });
  }

  // Dummy broken link handler
  const brokenLink = document.querySelector(".broken-link");
  if (brokenLink) {
    brokenLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        "Maaf, tautan ini tidak dapat diakses. Harap laporkan kepada dosen atau administrator."
      );
    });
  }

  // --- Right Sidebar Toggle Event Listeners ---
  // Universal toggle function
  const toggleRightSidebar = () => {
    if (isRightSidebarOpen) {
      closeRightSidebar();
    } else {
      openRightSidebar();
    }
  };

  // Click on the collapsed toggle bar (desktop) to open
  if (rightSidebarToggle) {
    rightSidebarToggle.addEventListener("click", toggleRightSidebar);
  }

  // Click on the 'X' close button inside the open sidebar (desktop and mobile)
  if (rightSidebarCloseBtn) {
    rightSidebarCloseBtn.addEventListener("click", closeRightSidebar);
  }

  // Click on overlay to close (mobile only)
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeRightSidebar);
  }

  // Initialize dashboard state on page load
  initializeDashboardState();

  // Set initial sidebar state based on screen size
  if (window.innerWidth >= 768) {
    // Desktop
    closeRightSidebar(); // Start closed by default on desktop
    document.body.style.overflow = ""; // Pastikan overflow tidak terpengaruh di desktop
  } else {
    // Mobile
    closeRightSidebar(); // Start closed by default on mobile (will use overlay)
    document.body.style.overflow = ""; // Pastikan overflow tidak terpengaruh di mobile
  }

  // Adjust sidebar state on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      // If resized to desktop
      if (!isRightSidebarOpen) {
        closeRightSidebar(); // Ensure desktop closed state
      } else {
        openRightSidebar(); // Ensure desktop open state
      }
      document.body.style.overflow = ""; // Pastikan overflow diatur dengan benar saat resize
    } else {
      // If resized to mobile
      if (isRightSidebarOpen) {
        openRightSidebar(); // Ensure mobile open state (overlay)
      } else {
        closeRightSidebar(); // Ensure mobile closed state
      }
      // Overflow body akan diatur oleh fungsi open/close sidebar
    }
  });
});

let lineChart; // chart global

const datasets = {
  apps: [{
    label: "Mobile apps",
    tension: 0.4,
    borderWidth: 0,
    pointRadius: 0,
    borderColor: "#cb0c9f",
    borderWidth: 3,
    backgroundColor: "rgba(203,12,159,0.2)",
    fill: true,
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    maxBarThickness: 6,
  }],
  websites: [{
    label: "Websites",
    tension: 0.4,
    borderWidth: 0,
    pointRadius: 0,
    borderColor: "#3A416F",
    borderWidth: 3,
    backgroundColor: "rgba(20,23,39,0.2)",
    fill: true,
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    maxBarThickness: 6,
  }],
  both: [ // menampilkan keduanya
    {
      label: "Mobile apps",
      tension: 0.4,
      borderWidth: 0,
      pointRadius: 0,
      borderColor: "#cb0c9f",
      borderWidth: 3,
      backgroundColor: "rgba(203,12,159,0.2)",
      fill: true,
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      maxBarThickness: 6,
    },
    {
      label: "Websites",
      tension: 0.4,
      borderWidth: 0,
      pointRadius: 0,
      borderColor: "#3A416F",
      borderWidth: 3,
      backgroundColor: "rgba(20,23,39,0.2)",
      fill: true,
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      maxBarThickness: 6,
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const leaderboardBtn = document.getElementById("leaderboard-floating-button");
  const leaderboardModal = document.getElementById("leaderboard-modal");
  const closeBtn = document.getElementById("close-leaderboard");

  leaderboardBtn.addEventListener("click", () => {
    leaderboardModal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    leaderboardModal.classList.add("hidden");
  });

  leaderboardModal.addEventListener("click", (e) => {
    if (e.target === leaderboardModal) leaderboardModal.classList.add("hidden");
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const welcomePopup = document.getElementById("welcome-popup");
//   const closeWelcome = document.getElementById("close-welcome-popup");

//   // Tampilkan otomatis saat load
//   welcomePopup.classList.remove("hidden");

//   // Tombol close
//   closeWelcome.addEventListener("click", () => {
//     welcomePopup.classList.add("hidden");
//   });

//   // Klik luar area popup menutup juga
//   welcomePopup.addEventListener("click", (e) => {
//     if (e.target === welcomePopup) {
//       welcomePopup.classList.add("hidden");
//     }
//   });
// });
