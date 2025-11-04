// app.js - Project Timeline Visualizer 应用程序逻辑

// 示例数据
const sampleProjects = [
    {
        id: 1,
        name: "网站重构项目",
        startDate: new Date(2023, 5, 1),
        endDate: new Date(2023, 7, 15),
        description: "公司官网重构与现代化改造",
        tasks: [
            { id: 1, name: "需求分析", startDate: new Date(2023, 5, 1), endDate: new Date(2023, 5, 7), progress: 100, priority: "low", status: "completed", assignee: "张三", dependencies: [] },
            { id: 2, name: "UI/UX设计", startDate: new Date(2023, 5, 8), endDate: new Date(2023, 5, 21), progress: 80, priority: "medium", status: "in-progress", assignee: "李四", dependencies: [1] },
            { id: 3, name: "前端开发", startDate: new Date(2023, 5, 15), endDate: new Date(2023, 6, 10), progress: 30, priority: "high", status: "in-progress", assignee: "王五", dependencies: [2] },
            { id: 4, name: "后端开发", startDate: new Date(2023, 5, 22), endDate: new Date(2023, 6, 15), progress: 20, priority: "high", status: "not-started", assignee: "赵六", dependencies: [1] },
            { id: 5, name: "测试与调试", startDate: new Date(2023, 6, 16), endDate: new Date(2023, 7, 5), progress: 0, priority: "medium", status: "not-started", assignee: "钱七", dependencies: [3, 4] },
            { id: 6, name: "部署上线", startDate: new Date(2023, 7, 6), endDate: new Date(2023, 7, 15), progress: 0, priority: "high", status: "not-started", assignee: "孙八", dependencies: [5] }
        ]
    },
    {
        id: 2,
        name: "移动应用开发",
        startDate: new Date(2023, 4, 1),
        endDate: new Date(2023, 8, 30),
        description: "企业级移动应用开发项目",
        tasks: [
            { id: 7, name: "市场调研", startDate: new Date(2023, 4, 1), endDate: new Date(2023, 4, 15), progress: 100, priority: "low", status: "completed", assignee: "张三", dependencies: [] },
            { id: 8, name: "原型设计", startDate: new Date(2023, 4, 16), endDate: new Date(2023, 5, 5), progress: 100, priority: "medium", status: "completed", assignee: "李四", dependencies: [7] },
            { id: 9, name: "iOS开发", startDate: new Date(2023, 5, 6), endDate: new Date(2023, 7, 10), progress: 60, priority: "high", status: "in-progress", assignee: "王五", dependencies: [8] },
            { id: 10, name: "Android开发", startDate: new Date(2023, 5, 6), endDate: new Date(2023, 7, 10), progress: 40, priority: "high", status: "in-progress", assignee: "赵六", dependencies: [8] },
            { id: 11, name: "后端API开发", startDate: new Date(2023, 5, 1), endDate: new Date(2023, 6, 15), progress: 90, priority: "high", status: "in-progress", assignee: "钱七", dependencies: [] },
            { id: 12, name: "测试与发布", startDate: new Date(2023, 7, 11), endDate: new Date(2023, 8, 30), progress: 0, priority: "medium", status: "not-started", assignee: "孙八", dependencies: [9, 10, 11] }
        ]
    },
    {
        id: 3,
        name: "数据分析平台",
        startDate: new Date(2023, 6, 1),
        endDate: new Date(2023, 10, 31),
        description: "大数据分析与可视化平台建设",
        tasks: [
            { id: 13, name: "技术选型", startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 10), progress: 100, priority: "medium", status: "completed", assignee: "张三", dependencies: [] },
            { id: 14, name: "数据架构设计", startDate: new Date(2023, 6, 11), endDate: new Date(2023, 6, 25), progress: 70, priority: "high", status: "in-progress", assignee: "李四", dependencies: [13] },
            { id: 15, name: "ETL流程开发", startDate: new Date(2023, 6, 26), endDate: new Date(2023, 8, 15), progress: 20, priority: "high", status: "in-progress", assignee: "王五", dependencies: [14] },
            { id: 16, name: "可视化界面开发", startDate: new Date(2023, 7, 1), endDate: new Date(2023, 9, 10), progress: 10, priority: "medium", status: "not-started", assignee: "赵六", dependencies: [14] },
            { id: 17, name: "系统集成测试", startDate: new Date(2023, 9, 11), endDate: new Date(2023, 10, 20), progress: 0, priority: "high", status: "not-started", assignee: "钱七", dependencies: [15, 16] },
            { id: 18, name: "上线部署", startDate: new Date(2023, 10, 21), endDate: new Date(2023, 10, 31), progress: 0, priority: "medium", status: "not-started", assignee: "孙八", dependencies: [17] }
        ]
    }
];

const teamMembers = [
    { id: 1, name: "张三", skills: ["UI设计", "用户体验"], load: 70 },
    { id: 2, name: "李四", skills: ["前端开发", "Vue.js", "React"], load: 85 },
    { id: 3, name: "王五", skills: ["iOS开发", "Swift"], load: 60 },
    { id: 4, name: "赵六", skills: ["Android开发", "Kotlin"], load: 75 },
    { id: 5, name: "钱七", skills: ["后端开发", "Node.js", "数据库"], load: 80 },
    { id: 6, name: "孙八", skills: ["测试", "质量保证"], load: 40 },
    { id: 7, name: "周九", skills: ["数据分析", "Python", "SQL"], load: 65 },
    { id: 8, name: "吴十", skills: ["项目管理", "敏捷开发"], load: 50 }
];

const taskStatuses = [
    { id: "not-started", name: "未开始" },
    { id: "in-progress", name: "进行中" },
    { id: "completed", name: "已完成" }
];

const views = [
    { id: "gantt", name: "甘特图", icon: "fas fa-chart-bar" },
    { id: "kanban", name: "看板", icon: "fas fa-columns" },
    { id: "calendar", name: "日历", icon: "fas fa-calendar-alt" },
    { id: "resource", name: "资源", icon: "fas fa-users" }
];

// Vue 应用程序
const { createApp } = Vue;

createApp({
    data() {
        return {
            projects: JSON.parse(JSON.stringify(sampleProjects)), // 深拷贝示例数据
            currentProject: null,
            currentView: "gantt",
            views: views,
            teamMembers: teamMembers,
            taskStatuses: taskStatuses,
            selectedTask: null,
            showTaskModal: false,
            showProjectModal: false,
            editingTask: null,
            taskForm: {
                name: "",
                startDate: this.formatDateForInput(new Date()),
                endDate: this.formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
                assignee: "",
                priority: "medium",
                progress: 0,
                dependencies: []
            },
            projectForm: {
                name: "",
                startDate: this.formatDateForInput(new Date()),
                endDate: this.formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
                description: ""
            },
            currentMonth: new Date().toLocaleString('zh-CN', { month: 'long' }),
            currentYear: new Date().getFullYear(),
            calendarDate: new Date(),
            dayHeaders: ['日', '一', '二', '三', '四', '五', '六'],
            projectRisks: [
                { id: 1, task: "前端开发", description: "进度落后计划5天", level: "medium" },
                { id: 2, task: "后端开发", description: "资源分配不足", level: "high" },
                { id: 3, task: "测试与调试", description: "依赖任务可能延迟", level: "low" }
            ],
            showCriticalPath: true,
            timeUnit: "day",
            resourceChart: null,
            progressChart: null,
            isFullscreen: false
        };
    },
    computed: {
        currentViewName() {
            const view = this.views.find(v => v.id === this.currentView);
            return view ? view.name : "";
        },
        completedTasks() {
            return this.currentProject.tasks.filter(task => task.status === "completed").length;
        },
        totalTasks() {
            return this.currentProject.tasks.length;
        },
        overdueTasks() {
            const today = new Date();
            return this.currentProject.tasks.filter(task => 
                new Date(task.endDate) < today && task.status !== "completed"
            ).length;
        },
        projectDuration() {
            const diffTime = Math.abs(new Date(this.currentProject.endDate) - new Date(this.currentProject.startDate));
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        },
        projectHealth() {
            // 健康度计算：基于完成进度、逾期任务、关键路径进度等因素
            const progressScore = (this.completedTasks / this.totalTasks) * 60;
            const overduePenalty = this.overdueTasks * 8;
            const criticalPathProgress = this.calculateCriticalPathProgress();
            const resourceBalanceScore = this.calculateResourceBalance();
            
            return Math.max(0, Math.min(100, 
                progressScore - overduePenalty + (criticalPathProgress * 20) + (resourceBalanceScore * 20)
            ));
        },
        projectHealthClass() {
            if (this.projectHealth >= 70) return "good";
            if (this.projectHealth >= 40) return "";
            return "warning";
        },
        timelineDays() {
            const days = [];
            const start = new Date(this.currentProject.startDate);
            const end = new Date(this.currentProject.endDate);
            
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                days.push(new Date(date));
            }
            
            return days.slice(0, 21); // 显示前21天作为示例
        },
        calendarDays() {
            const year = this.calendarDate.getFullYear();
            const month = this.calendarDate.getMonth();
            
            // 当月第一天
            const firstDay = new Date(year, month, 1);
            // 当月最后一天
            const lastDay = new Date(year, month + 1, 0);
            // 当月第一天是周几（0-6，0是周日）
            const firstDayOfWeek = firstDay.getDay();
            // 当月总天数
            const daysInMonth = lastDay.getDate();
            
            // 上个月最后几天
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            const days = [];
            
            // 添加上个月的最后几天
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const date = new Date(year, month - 1, prevMonthLastDay - i);
                days.push({ date, isCurrentMonth: false });
            }
            
            // 添加当月的所有天
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                days.push({ date, isCurrentMonth: true });
            }
            
            // 添加下个月的前几天，补齐6行
            const totalCells = 42; // 6行 * 7天
            const nextMonthDays = totalCells - days.length;
            for (let i = 1; i <= nextMonthDays; i++) {
                const date = new Date(year, month + 1, i);
                days.push({ date, isCurrentMonth: false });
            }
            
            return days;
        },
        dependencyLines() {
            const lines = [];
            let lineId = 1;
            
            this.currentProject.tasks.forEach(task => {
                if (task.dependencies && task.dependencies.length > 0) {
                    task.dependencies.forEach(depId => {
                        const depTask = this.currentProject.tasks.find(t => t.id === depId);
                        if (depTask) {
                            const fromIndex = this.currentProject.tasks.indexOf(depTask);
                            const toIndex = this.currentProject.tasks.indexOf(task);
                            
                            if (fromIndex >= 0 && toIndex >= 0) {
                                const fromLeft = this.calculateTaskPosition(depTask.startDate);
                                const fromWidth = this.calculateTaskWidth(depTask.startDate, depTask.endDate);
                                const toLeft = this.calculateTaskPosition(task.startDate);
                                
                                const x1 = fromLeft + fromWidth;
                                const y1 = (fromIndex * 40) + 15; // 任务条中间
                                const x2 = toLeft;
                                const y2 = (toIndex * 40) + 15;
                                
                                lines.push({
                                    id: lineId++,
                                    x1: x1,
                                    y1: y1,
                                    x2: x2,
                                    y2: y2
                                });
                            }
                        }
                    });
                }
            });
            
            return lines;
        },
        criticalTasks() {
            return this.calculateCriticalPath();
        }
    },
    mounted() {
        this.currentProject = this.projects[0];
        this.selectedTask = this.currentProject.tasks[0];
        this.initResourceChart();
        this.initProgressChart();
        this.loadFromLocalStorage();
    },
    methods: {
        switchView(view) {
            this.currentView = view;
            if (view === 'resource') {
                this.$nextTick(() => {
                    this.initResourceChart();
                });
            } else if (view === 'gantt') {
                this.$nextTick(() => {
                    this.initProgressChart();
                });
            }
        },
        selectProject(project) {
            this.currentProject = project;
            this.selectedTask = project.tasks[0] || null;
            
            if (this.currentView === 'resource') {
                this.$nextTick(() => {
                    this.initResourceChart();
                });
            }
            
            this.saveToLocalStorage();
        },
        selectTask(task) {
            this.selectedTask = task;
        },
        selectTaskById(taskId) {
            const task = this.currentProject.tasks.find(t => t.id === taskId);
            if (task) {
                this.selectedTask = task;
            }
        },
        getTasksByStatus(status) {
            return this.currentProject.tasks.filter(task => task.status === status);
        },
        getPriorityColor(priority) {
            switch(priority) {
                case "high": return "#f94144";
                case "medium": return "#f8961e";
                case "low": return "#43aa8b";
                default: return "#6c757d";
            }
        },
        getPriorityText(priority) {
            switch(priority) {
                case "high": return "高优先级";
                case "medium": return "中优先级";
                case "low": return "低优先级";
                default: return "普通";
            }
        },
        getStatusText(status) {
            switch(status) {
                case "completed": return "已完成";
                case "in-progress": return "进行中";
                case "not-started": return "未开始";
                default: return "未知";
            }
        },
        formatDate(date) {
            if (!date) return "";
            if (typeof date === 'string') date = new Date(date);
            return date.toLocaleDateString('zh-CN');
        },
        formatDateForInput(date) {
            if (!date) return "";
            if (typeof date === 'string') date = new Date(date);
            return date.toISOString().split('T')[0];
        },
        formatTimelineDate(date) {
            return date.getDate() + '/' + (date.getMonth() + 1);
        },
        calculateTaskPosition(startDate) {
            const projectStart = new Date(this.currentProject.startDate);
            const taskStart = new Date(startDate);
            const projectDuration = this.projectDuration;
            const daysFromStart = Math.ceil((taskStart - projectStart) / (1000 * 60 * 60 * 24));
            
            return Math.max(0, (daysFromStart / projectDuration) * 100);
        },
        calculateTaskWidth(startDate, endDate) {
            const taskStart = new Date(startDate);
            const taskEnd = new Date(endDate);
            const taskDuration = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1; // 包含开始和结束日
            const projectDuration = this.projectDuration;
            
            return Math.max(1, Math.min(100, (taskDuration / projectDuration) * 100));
        },
        getTasksForDay(date) {
            return this.currentProject.tasks.filter(task => {
                const taskStart = new Date(task.startDate);
                const taskEnd = new Date(task.endDate);
                return date >= taskStart && date <= taskEnd;
            });
        },
        prevMonth() {
            this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1);
            this.currentMonth = this.calendarDate.toLocaleString('zh-CN', { month: 'long' });
            this.currentYear = this.calendarDate.getFullYear();
        },
        nextMonth() {
            this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1);
            this.currentMonth = this.calendarDate.toLocaleString('zh-CN', { month: 'long' });
            this.currentYear = this.calendarDate.getFullYear();
        },
        resetToToday() {
            this.calendarDate = new Date();
            this.currentMonth = this.calendarDate.toLocaleString('zh-CN', { month: 'long' });
            this.currentYear = this.calendarDate.getFullYear();
        },
        getInitials(name) {
            return name.split('').slice(0, 2).join('').toUpperCase();
        },
        getDependencyStatus(depId) {
            const task = this.currentProject.tasks.find(t => t.id === depId);
            return task ? task.status : "not-started";
        },
        getTaskName(taskId) {
            const task = this.currentProject.tasks.find(t => t.id === taskId);
            return task ? task.name : "未知任务";
        },
        initResourceChart() {
            if (this.resourceChart) {
                this.resourceChart.destroy();
            }
            
            const options = {
                series: [{
                    name: '工作负载',
                    data: this.teamMembers.map(member => member.load)
                }],
                chart: {
                    height: 300,
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#4361ee'],
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: this.teamMembers.map(member => member.name),
                    max: 100
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            };

            this.resourceChart = new ApexCharts(document.querySelector("#resourceChart"), options);
            this.resourceChart.render();
        },
        initProgressChart() {
            if (this.progressChart) {
                this.progressChart.destroy();
            }
            
            const completed = this.currentProject.tasks.filter(t => t.status === 'completed').length;
            const inProgress = this.currentProject.tasks.filter(t => t.status === 'in-progress').length;
            const notStarted = this.currentProject.tasks.filter(t => t.status === 'not-started').length;
            
            const options = {
                series: [completed, inProgress, notStarted],
                chart: {
                    height: 200,
                    type: 'donut',
                },
                labels: ['已完成', '进行中', '未开始'],
                colors: ['#4cc9f0', '#f8961e', '#6c757d'],
                legend: {
                    position: 'bottom'
                },
                dataLabels: {
                    enabled: false
                }
            };

            this.progressChart = new ApexCharts(document.querySelector("#progressChart"), options);
            this.progressChart.render();
        },
        calculateCriticalPath() {
            // 简化的关键路径计算
            // 在实际应用中，这里应该使用更复杂的算法如CPM或PERT
            const criticalTasks = [];
            const today = new Date();
            
            this.currentProject.tasks.forEach(task => {
                const taskEnd = new Date(task.endDate);
                const timeDiff = taskEnd.getTime() - today.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                // 如果任务结束日期接近且进度较慢，认为是关键任务
                if (daysDiff < 7 && task.progress < 50) {
                    criticalTasks.push(task.id);
                }
            });
            
            return criticalTasks;
        },
        isCriticalTask(taskId) {
            if (!this.showCriticalPath) return false;
            return this.criticalTasks.includes(taskId);
        },
        calculateCriticalPathProgress() {
            const criticalTasks = this.criticalTasks;
            if (criticalTasks.length === 0) return 1;
            
            let totalProgress = 0;
            criticalTasks.forEach(taskId => {
                const task = this.currentProject.tasks.find(t => t.id === taskId);
                if (task) {
                    totalProgress += task.progress;
                }
            });
            
            return totalProgress / (criticalTasks.length * 100);
        },
        calculateResourceBalance() {
            // 计算资源分配的均衡度
            const loads = this.teamMembers.map(m => m.load);
            const avgLoad = loads.reduce((a, b) => a + b, 0) / loads.length;
            const variance = loads.reduce((a, b) => a + Math.pow(b - avgLoad, 2), 0) / loads.length;
            
            // 方差越小，资源分配越均衡
            return Math.max(0, 1 - (variance / 2500)); // 标准化到0-1
        },
        showAddTaskModal() {
            this.editingTask = null;
            this.taskForm = {
                name: "",
                startDate: this.formatDateForInput(new Date()),
                endDate: this.formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
                assignee: this.teamMembers[0]?.name || "",
                priority: "medium",
                progress: 0,
                dependencies: []
            };
            this.showTaskModal = true;
        },
        editTask(task) {
            this.editingTask = task;
            this.taskForm = {
                name: task.name,
                startDate: this.formatDateForInput(task.startDate),
                endDate: this.formatDateForInput(task.endDate),
                assignee: task.assignee,
                priority: task.priority,
                progress: task.progress,
                dependencies: [...task.dependencies]
            };
            this.showTaskModal = true;
        },
        saveTask() {
            if (!this.taskForm.name.trim()) {
                alert("请输入任务名称");
                return;
            }
            
            const taskData = {
                id: this.editingTask ? this.editingTask.id : Math.max(...this.currentProject.tasks.map(t => t.id), 0) + 1,
                name: this.taskForm.name,
                startDate: new Date(this.taskForm.startDate),
                endDate: new Date(this.taskForm.endDate),
                assignee: this.taskForm.assignee,
                priority: this.taskForm.priority,
                progress: parseInt(this.taskForm.progress),
                dependencies: this.taskForm.dependencies,
                status: this.taskForm.progress === 100 ? "completed" : 
                        this.taskForm.progress > 0 ? "in-progress" : "not-started"
            };
            
            if (this.editingTask) {
                const index = this.currentProject.tasks.findIndex(t => t.id === this.editingTask.id);
                if (index !== -1) {
                    this.currentProject.tasks.splice(index, 1, taskData);
                }
            } else {
                this.currentProject.tasks.push(taskData);
            }
            
            this.closeTaskModal();
            this.saveToLocalStorage();
            
            // 重新初始化图表
            if (this.currentView === 'resource') {
                this.initResourceChart();
            }
            this.initProgressChart();
        },
        deleteTask(taskId) {
            if (confirm("确定要删除这个任务吗？")) {
                this.currentProject.tasks = this.currentProject.tasks.filter(t => t.id !== taskId);
                if (this.selectedTask && this.selectedTask.id === taskId) {
                    this.selectedTask = this.currentProject.tasks[0] || null;
                }
                this.saveToLocalStorage();
                this.initProgressChart();
            }
        },
        closeTaskModal() {
            this.showTaskModal = false;
            this.editingTask = null;
        },
        showAddProjectModal() {
            this.projectForm = {
                name: "",
                startDate: this.formatDateForInput(new Date()),
                endDate: this.formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
                description: ""
            };
            this.showProjectModal = true;
        },
        saveProject() {
            if (!this.projectForm.name.trim()) {
                alert("请输入项目名称");
                return;
            }
            
            const projectData = {
                id: Math.max(...this.projects.map(p => p.id), 0) + 1,
                name: this.projectForm.name,
                startDate: new Date(this.projectForm.startDate),
                endDate: new Date(this.projectForm.endDate),
                description: this.projectForm.description,
                tasks: []
            };
            
            this.projects.push(projectData);
            this.selectProject(projectData);
            this.closeProjectModal();
            this.saveToLocalStorage();
        },
        closeProjectModal() {
            this.showProjectModal = false;
        },
        exportToPDF() {
            alert("PDF导出功能已触发！在实际应用中，这里会生成PDF文件。");
            // 实际实现会使用jsPDF和html2canvas库
        },
        exportToImage() {
            alert("图片导出功能已触发！在实际应用中，这里会生成项目截图。");
            // 实际实现会使用html2canvas库
        },
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            const viewContainer = document.querySelector('.view-container');
            if (this.isFullscreen) {
                viewContainer.classList.add('fullscreen');
            } else {
                viewContainer.classList.remove('fullscreen');
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('projectTimelineData', JSON.stringify({
                projects: this.projects,
                currentProjectId: this.currentProject.id,
                currentView: this.currentView
            }));
        },
        loadFromLocalStorage() {
            const savedData = localStorage.getItem('projectTimelineData');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    this.projects = data.projects;
                    const currentProject = this.projects.find(p => p.id === data.currentProjectId);
                    if (currentProject) {
                        this.currentProject = currentProject;
                    }
                    this.currentView = data.currentView || 'gantt';
                } catch (e) {
                    console.error('加载本地数据失败', e);
                }
            }
        }
    }
}).mount('#app');

// 添加一些CSS样式用于全屏模式
const style = document.createElement('style');
style.textContent = `
    .view-container.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: white;
    }
    
    .view-container.fullscreen .view-content {
        height: 100%;
        padding: 0;
    }
    
    .view-container.fullscreen .gantt-container {
        height: 100%;
    }
`;
document.head.appendChild(style);
