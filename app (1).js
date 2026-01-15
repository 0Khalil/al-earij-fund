// ==================================================
// صندوق آل عريج التعاوني - نظام إدارة متقدم
// تم التطوير بواسطة: صندوق آل عريج التعاوني
// جميع الحقوق محفوظة © 2026
// ==================================================

// ==================================================
// 1. البيانات الأساسية (Data Layer)
// ==================================================

const fundData = {
    members: [
        { id: 'AE001', name: 'محمد بن سعد العريج', family: 'آل سعد', phone: '0501234567', status: 'متقدم', balance: 15000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-10', joinDate: '2024-01-01' },
        { id: 'AE002', name: 'عبدالله بن فهد العريج', family: 'آل فهد', phone: '0501234568', status: 'محدّث', balance: 12000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-08', joinDate: '2024-01-15' },
        { id: 'AE003', name: 'خالد بن علي العريج', family: 'آل علي', phone: '0501234569', status: 'تحذير', balance: 8500, due: 1000, monthlyPayment: 500, lastPayment: '2025-12-15', joinDate: '2024-02-01' },
        { id: 'AE004', name: 'سعد بن محمد العريج', family: 'آل محمد', phone: '0501234570', status: 'متأخر', balance: 5000, due: 2000, monthlyPayment: 500, lastPayment: '2025-11-01', joinDate: '2024-02-15' },
        { id: 'AE005', name: 'فهد بن عبدالله العريج', family: 'آل عبدالله', phone: '0501234571', status: 'متقدم', balance: 18000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-12', joinDate: '2024-03-01' },
        { id: 'AE006', name: 'علي بن خالد العريج', family: 'آل خالد', phone: '0501234572', status: 'محدّث', balance: 11000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-05', joinDate: '2024-03-15' },
        { id: 'AE007', name: 'أحمد بن سعود العريج', family: 'آل سعود', phone: '0501234573', status: 'متقدم', balance: 16500, due: 500, monthlyPayment: 500, lastPayment: '2026-01-11', joinDate: '2024-04-01' },
        { id: 'AE008', name: 'سعود بن أحمد العريج', family: 'آل أحمد', phone: '0501234574', status: 'تحذير', balance: 9000, due: 1500, monthlyPayment: 500, lastPayment: '2025-12-20', joinDate: '2024-04-15' },
        { id: 'AE009', name: 'ناصر بن راشد العريج', family: 'آل راشد', phone: '0501234575', status: 'محدّث', balance: 13500, due: 500, monthlyPayment: 500, lastPayment: '2026-01-07', joinDate: '2024-05-01' },
        { id: 'AE010', name: 'راشد بن ناصر العريج', family: 'آل ناصر', phone: '0501234576', status: 'متقدم', balance: 17000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-13', joinDate: '2024-05-15' },
        { id: 'AE011', name: 'عبدالرحمن بن عبدالعزيز', family: 'آل عبدالعزيز', phone: '0501234577', status: 'محدّث', balance: 10500, due: 500, monthlyPayment: 500, lastPayment: '2026-01-06', joinDate: '2024-06-01' },
        { id: 'AE012', name: 'عبدالعزيز بن عبدالرحمن', family: 'آل سعد', phone: '0501234578', status: 'متأخر', balance: 4500, due: 2500, monthlyPayment: 500, lastPayment: '2025-10-15', joinDate: '2024-06-15' },
        { id: 'AE013', name: 'تركي بن فيصل العريج', family: 'آل فيصل', phone: '0501234579', status: 'متقدم', balance: 19000, due: 500, monthlyPayment: 500, lastPayment: '2026-01-14', joinDate: '2024-07-01' },
        { id: 'AE014', name: 'فيصل بن تركي العريج', family: 'آل تركي', phone: '0501234580', status: 'محدّث', balance: 12500, due: 500, monthlyPayment: 500, lastPayment: '2026-01-09', joinDate: '2024-07-15' },
        { id: 'AE015', name: 'مشعل بن ماجد العريج', family: 'آل ماجد', phone: '0501234581', status: 'تحذير', balance: 7500, due: 1500, monthlyPayment: 500, lastPayment: '2025-12-10', joinDate: '2024-08-01' }
    ],

    settings: {
        monthlyDue: 500,
        currency: 'ر.س',
        fundStartDate: '2024-01-01',
        totalFundBalance: 179000,
        lastUpdate: new Date().toISOString()
    }
};

// حفظ البيانات في localStorage
function saveData() {
    localStorage.setItem('fundData', JSON.stringify(fundData));
}

// تحميل البيانات من localStorage
function loadData() {
    const saved = localStorage.getItem('fundData');
    if (saved) {
        const data = JSON.parse(saved);
        fundData.members = data.members;
        fundData.settings = data.settings;
    }
}

// ==================================================
// 2. دوال مساعدة (Helper Functions)
// ==================================================

function formatCurrency(amount) {
    return amount.toLocaleString('ar-SA') + ' ' + fundData.settings.currency;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getStatusClass(status) {
    const statusMap = {
        'متقدم': 'success',
        'محدّث': 'info',
        'تحذير': 'warning',
        'متأخر': 'danger'
    };
    return statusMap[status] || 'info';
}

function getStatusIcon(status) {
    const iconMap = {
        'متقدم': 'fa-check-circle',
        'محدّث': 'fa-clock',
        'تحذير': 'fa-exclamation-triangle',
        'متأخر': 'fa-times-circle'
    };
    return iconMap[status] || 'fa-circle';
}

// ==================================================
// 3. حسابات الإحصائيات (Statistics)
// ==================================================

function calculateStats() {
    const total = fundData.members.length;
    const active = fundData.members.filter(m => m.status === 'متقدم').length;
    const updated = fundData.members.filter(m => m.status === 'محدّث').length;
    const warning = fundData.members.filter(m => m.status === 'تحذير').length;
    const late = fundData.members.filter(m => m.status === 'متأخر').length;

    const totalBalance = fundData.members.reduce((sum, m) => sum + m.balance, 0);
    const totalDue = fundData.members.reduce((sum, m) => sum + m.due, 0);
    const avgBalance = totalBalance / total;
    const collectionRate = ((total - late) / total * 100).toFixed(1);

    // حساب الإيرادات الشهرية المتوقعة
    const monthlyIncome = fundData.members.reduce((sum, m) => sum + m.monthlyPayment, 0);

    return {
        total,
        active,
        updated,
        warning,
        late,
        totalBalance,
        totalDue,
        avgBalance,
        collectionRate,
        monthlyIncome
    };
}

// حساب التوقعات المستقبلية (سنتين)
function calculateFutureProjections() {
    const stats = calculateStats();
    const monthlyIncome = stats.monthlyIncome;
    const currentBalance = stats.totalBalance;

    // افتراضات:
    // - معدل التحصيل: 90%
    // - معدل النمو في الأعضاء: 5% سنوياً
    // - تكاليف إدارية: 2% من الإيرادات

    const collectionEfficiency = 0.90;
    const memberGrowthRate = 0.05;
    const adminCostRate = 0.02;

    const projections = [];
    let balance = currentBalance;
    let members = fundData.members.length;

    for (let month = 1; month <= 24; month++) {
        // زيادة الأعضاء سنوياً
        if (month % 12 === 0) {
            members = Math.round(members * (1 + memberGrowthRate));
        }

        const income = (members * fundData.settings.monthlyDue) * collectionEfficiency;
        const adminCost = income * adminCostRate;
        const netIncome = income - adminCost;

        balance += netIncome;

        projections.push({
            month: month,
            balance: Math.round(balance),
            income: Math.round(income),
            members: members
        });
    }

    return projections;
}

// ==================================================
// 4. إدارة المشتركين (Members Management)
// ==================================================

function getMemberById(id) {
    return fundData.members.find(m => m.id === id);
}

function addMember(memberData) {
    // توليد ID جديد
    const lastId = fundData.members.length > 0 
        ? parseInt(fundData.members[fundData.members.length - 1].id.substring(2))
        : 0;
    const newId = 'AE' + String(lastId + 1).padStart(3, '0');

    const newMember = {
        id: newId,
        ...memberData,
        balance: 0,
        due: fundData.settings.monthlyDue,
        joinDate: new Date().toISOString().split('T')[0]
    };

    fundData.members.push(newMember);
    saveData();
    return newMember;
}

function updateMember(id, updates) {
    const index = fundData.members.findIndex(m => m.id === id);
    if (index !== -1) {
        fundData.members[index] = { ...fundData.members[index], ...updates };
        saveData();
        return true;
    }
    return false;
}

function deleteMember(id) {
    const index = fundData.members.findIndex(m => m.id === id);
    if (index !== -1) {
        fundData.members.splice(index, 1);
        saveData();
        return true;
    }
    return false;
}

// ==================================================
// 5. واتساب (WhatsApp Integration)
// ==================================================

function sendWhatsAppMessage(memberId) {
    const member = getMemberById(memberId);
    if (!member) return;

    const message = `السلام عليكم يا ${member.name}،

📊 *حالة اشتراكك في صندوق آل عريج:*

✅ الحالة: ${member.status}
💰 الرصيد الحالي: ${formatCurrency(member.balance)}
📌 المستحق: ${formatCurrency(member.due)}
📅 آخر سداد: ${formatDate(member.lastPayment)}

شكراً لك على التزامك 🌟
_صندوق آل عريج التعاوني_`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = member.phone.replace(/^0/, '966'); // تحويل من 05 إلى 9665
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// ==================================================
// 6. الفلاتر والبحث (Filters & Search)
// ==================================================

function filterMembers(searchTerm = '', statusFilter = '', familyFilter = '') {
    let filtered = fundData.members;

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(m => 
            m.name.toLowerCase().includes(term) || 
            m.id.toLowerCase().includes(term) ||
            m.phone.includes(term)
        );
    }

    if (statusFilter) {
        filtered = filtered.filter(m => m.status === statusFilter);
    }

    if (familyFilter) {
        filtered = filtered.filter(m => m.family === familyFilter);
    }

    return filtered;
}

// ==================================================
// 7. التصدير (Export Functions)
// ==================================================

function exportToExcel() {
    // تحويل البيانات إلى CSV
    const headers = ['الرمز', 'الاسم', 'العائلة', 'الهاتف', 'الحالة', 'الرصيد', 'المستحق', 'آخر سداد'];
    const rows = fundData.members.map(m => [
        m.id,
        m.name,
        m.family,
        m.phone,
        m.status,
        m.balance,
        m.due,
        m.lastPayment
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });

    // تحميل الملف
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `صندوق_آل_عريج_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// ==================================================
// 8. الإشعارات (Notifications)
// ==================================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#F0FDF4' : type === 'error' ? '#FEF2F2' : '#F0F9FF'};
        color: ${type === 'success' ? '#16A34A' : type === 'error' ? '#DC2626' : '#0284C7'};
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: Cairo, sans-serif;
        font-weight: 600;
        animation: slideDown 0.3s ease;
        border: 2px solid ${type === 'success' ? '#86EFAC' : type === 'error' ? '#FCA5A5' : '#7DD3FC'};
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ==================================================
// 9. التهيئة والتشغيل (Initialization)
// ==================================================

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// تحميل البيانات عند بدء التطبيق
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    checkAuth();
});

// حفظ البيانات تلقائياً كل دقيقة
setInterval(saveData, 60000);

console.log('✅ نظام صندوق آل عريج جاهز للعمل!');
console.log('📊 عدد المشتركين:', fundData.members.length);
console.log('💰 الرصيد الإجمالي:', formatCurrency(calculateStats().totalBalance));
