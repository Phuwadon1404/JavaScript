// ฟังก์ชันสำหรับประมวลผลข้อมูล JSON
function processLogs(logs) {
    const userActivities = {}; // เก็บข้อมูลกิจกรรมของแต่ละผู้ใช้
    const userSessions = {}; // เก็บข้อมูลเซสชันของแต่ละผู้ใช้
    const errorCounts = {}; // เก็บจำนวนข้อผิดพลาดของแต่ละผู้ใช้
  
    // ประมวลผล log ทีละรายการ
    logs.forEach((log) => {
      const { timestamp, user, action } = log;
  
      // กรณีที่ผู้ใช้ยังไม่มีข้อมูลในโครงสร้าง เก็บข้อมูลพื้นฐาน
      if (!userActivities[user]) {
        userActivities[user] = [];
        userSessions[user] = [];
        errorCounts[user] = 0;
      }
  
      // เพิ่มข้อมูลกิจกรรมใน log
      userActivities[user].push(log);
  
      // ตรวจสอบกิจกรรม ERROR
      if (action === "ERROR") {
        errorCounts[user]++;
      }
  
      // ตรวจสอบเซสชัน LOGIN/LOGOUT
      if (action === "LOGIN") {
        userSessions[user].push({ start: timestamp, end: null });
      } else if (action === "LOGOUT" && userSessions[user].length > 0) {
        const lastSession = userSessions[user][userSessions[user].length - 1];
        if (lastSession && !lastSession.end) {
          lastSession.end = timestamp;
        }
      }
    });
  
    // สร้างรายงาน
    const report = {
      totalActivities: {},
      sessionDurations: {},
      totalErrors: errorCounts,
      mostActiveUser: null,
    };
  
    let maxActivities = 0;
  
    for (const user in userActivities) {
      // จำนวนกิจกรรมทั้งหมดของแต่ละผู้ใช้
      const activityCount = userActivities[user].length;
      report.totalActivities[user] = activityCount;
  
      // ตรวจหาผู้ใช้ที่มีกิจกรรมมากที่สุด
      if (activityCount > maxActivities) {
        maxActivities = activityCount;
        report.mostActiveUser = user;
      }
  
      // คำนวณระยะเวลาเซสชัน
      report.sessionDurations[user] = userSessions[user]
        .filter((session) => session.start && session.end) // ต้องมีทั้งเริ่มและสิ้นสุด
        .map((session) => {
          const start = new Date(session.start);
          const end = new Date(session.end);
          return Math.round((end - start) / 60000); // แปลงเป็นนาที
        });
    }
  
    return report;
  }
  
  // ตัวอย่างข้อมูล JSON
  const logs = [
    { timestamp: "2025-01-15T10:00:00Z", user: "Alice", action: "LOGIN", details: "User logged in" },
    { timestamp: "2025-01-15T10:05:00Z", user: "Alice", action: "REQUEST", details: "Made a request" },
    { timestamp: "2025-01-15T10:15:00Z", user: "Alice", action: "LOGOUT", details: "User logged out" },
    { timestamp: "2025-01-15T10:20:00Z", user: "Bob", action: "LOGIN", details: "User logged in" },
    { timestamp: "2025-01-15T10:25:00Z", user: "Bob", action: "ERROR", details: "An error occurred" },
    { timestamp: "2025-01-15T10:30:00Z", user: "Bob", action: "LOGOUT", details: "User logged out" },
    { timestamp: "2025-01-15T10:35:00Z", user: "Alice", action: "LOGIN", details: "User logged in again" },
    { timestamp: "2025-01-15T10:45:00Z", user: "Alice", action: "LOGOUT", details: "User logged out again" },
  ];
  
  // เรียกใช้ฟังก์ชัน
  const report = processLogs(logs);
  console.log(report);
  