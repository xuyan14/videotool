// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabs();
    initializeDropdowns();
    initializeUploadModal();
    initializeMethodTabs();
    initializeScriptMethod();
    initializeCustomInputs();
    initializeTaskManagement();
    initializeScriptList();
});

// 当前步骤
let currentStep = 1;
const totalSteps = 4;

// 三级品类数据结构
const categoryData = {
    clothing: {
        name: '服装鞋帽',
        children: {
            women: {
                name: '女装',
                children: {
                    dress: { name: '连衣裙' },
                    tops: { name: '上衣' },
                    pants: { name: '裤装' },
                    skirts: { name: '半身裙' },
                    outerwear: { name: '外套' }
                }
            },
            men: {
                name: '男装',
                children: {
                    shirts: { name: '衬衫' },
                    tshirts: { name: 'T恤' },
                    pants: { name: '裤装' },
                    suits: { name: '西装' },
                    jackets: { name: '夹克' }
                }
            },
            shoes: {
                name: '鞋类',
                children: {
                    sneakers: { name: '运动鞋' },
                    dress: { name: '正装鞋' },
                    casual: { name: '休闲鞋' },
                    boots: { name: '靴子' },
                    sandals: { name: '凉鞋' }
                }
            }
        }
    },
    beauty: {
        name: '美妆护肤',
        children: {
            skincare: {
                name: '护肤',
                children: {
                    cleanser: { name: '洁面' },
                    moisturizer: { name: '面霜' },
                    serum: { name: '精华' },
                    mask: { name: '面膜' },
                    sunscreen: { name: '防晒' }
                }
            },
            makeup: {
                name: '彩妆',
                children: {
                    foundation: { name: '粉底' },
                    lipstick: { name: '口红' },
                    eyeshadow: { name: '眼影' },
                    mascara: { name: '睫毛膏' },
                    blush: { name: '腮红' }
                }
            }
        }
    },
    digital: {
        name: '数码家电',
        children: {
            phones: {
                name: '手机通讯',
                children: {
                    smartphones: { name: '智能手机' },
                    accessories: { name: '手机配件' },
                    cases: { name: '手机壳' },
                    chargers: { name: '充电器' }
                }
            },
            computers: {
                name: '电脑办公',
                children: {
                    laptops: { name: '笔记本' },
                    desktops: { name: '台式机' },
                    tablets: { name: '平板电脑' },
                    accessories: { name: '电脑配件' }
                }
            }
        }
    }
};

// 当前选择的品类状态
let currentCategorySelection = {
    level1: null,
    level2: null,
    level3: null
};

// 初始化导航菜单
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item.has-submenu');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            item.classList.toggle('open');
        });
    });
}

// 初始化标签页切换
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const flatOptions = document.querySelector('.flat-options');
    const videoOptions = document.querySelector('.video-options');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            flatOptions.style.display = 'none';
            videoOptions.style.display = 'none';
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 显示对应的选项
            const category = this.getAttribute('data-category');
            if (category === 'flat') {
                flatOptions.style.display = 'flex';
            } else if (category === 'video') {
                videoOptions.style.display = 'flex';
            }
        });
    });
}

// 初始化下拉菜单
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
        
        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', function() {
            menu.style.display = 'none';
        });
    });
}

// 初始化上传弹窗
function initializeUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    const uploadProgressModal = document.getElementById('uploadProgressModal');
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            closeUploadModal();
        }
        if (e.target === uploadProgressModal) {
            closeUploadProgressModal();
        }
    });
}

// 初始化方法标签页
function initializeMethodTabs() {
    const methodTabs = document.querySelectorAll('.method-tab');
    
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            const parentSection = this.closest('.generation-methods');
            
            // 移除同组所有标签的活动状态
            parentSection.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
            parentSection.querySelectorAll('.method-panel').forEach(p => p.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 显示对应的面板
            const targetPanel = parentSection.querySelector(`#${method}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// 初始化脚本生成方式
function initializeScriptMethod() {
    // 初始化配置标签页切换
    const configTabs = document.querySelectorAll('.config-tab');
    configTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // 记录当前脚本方法
            window.currentScriptMethod = method;
            
            // 移除所有标签的活动状态
            configTabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 切换配置面板
            const configPanels = document.querySelectorAll('.config-panel');
            configPanels.forEach(panel => panel.classList.remove('active'));
            
            const targetPanel = document.getElementById(method + 'Config');
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // 如果是AI裂变面板，初始化品类选择器
                if (method === 'split') {
                    setTimeout(() => {
                        console.log('=== AI裂变面板已激活，开始初始化品类选择器 ===');
                        initCategorySelector();
                    }, 100);
                }
            }
        });
    });
}

// 初始化自定义输入监听
function initializeCustomInputs() {
    // 不再需要监听，因为不显示已选择结果
}



// 更新步骤显示
function updateStepDisplay() {
    console.log('updateStepDisplay被调用，当前步骤:', currentStep);
    
    // 更新步骤指示器
    const steps = document.querySelectorAll('.step');
    console.log('找到步骤指示器数量:', steps.length);
    
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
    
    // 更新步骤内容
    const stepContents = document.querySelectorAll('.step-content');
    console.log('找到步骤内容数量:', stepContents.length);
    
    stepContents.forEach((content, index) => {
        const stepNum = index + 1;
        content.classList.remove('active');
        
        if (stepNum === currentStep) {
            content.classList.add('active');
            console.log('激活步骤内容:', stepNum);
            
            // 如果是步骤3（视频混剪），初始化视频编辑功能
            if (stepNum === 3) {
                setTimeout(() => {
                    initializeVideoEditing();
                }, 100);
            }
        }
    });
}

// 验证当前步骤
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateProductIdentification();
        case 2:
            return validateScriptGeneration();
        case 3:
            return validateVideoMixing();
        case 4:
            return true; // 最后一步不需要验证
        default:
            return true;
    }
}

// 验证商品识别
function validateProductIdentification() {
    const productId = document.getElementById('productId');
    const productInfo = document.getElementById('productInfo');
    
    // 检查商品ID是否已输入且商品信息是否已显示
    if (!productId || !productId.value.trim()) {
        showMessage('请输入商品ID或链接', 'warning');
        return false;
    }
    
    // 检查商品信息是否已显示（表示识别成功）
    if (!productInfo || productInfo.style.display === 'none') {
        showMessage('请先识别商品', 'warning');
        return false;
    }
    
    // 检查是否至少选择了一个商品简称或卖点
    const selectedNameTags = document.querySelectorAll('.name-tag.active');
    const selectedPointTags = document.querySelectorAll('.point-tag.active');
    const customName = document.getElementById('customName');
    const customTags = document.querySelectorAll('#existingTags .custom-tag');
    
    if (selectedNameTags.length === 0 && selectedPointTags.length === 0 && 
        (!customName || !customName.value.trim()) && customTags.length === 0) {
        showMessage('请至少选择一个商品简称或卖点', 'warning');
        return false;
    }
    
    // 如果验证通过，显示下一步按钮
    const step1Actions = document.getElementById('step1Actions');
    if (step1Actions) {
        step1Actions.style.display = 'flex';
    }
    
    return true;
}

// 验证卖点提炼
function validateSellingPoints() {
    const selectedItems = document.querySelectorAll('.selected-item');
    if (selectedItems.length === 0) {
        alert('请至少选择一个商品简称和卖点');
        return false;
    }
    return true;
}

// 验证脚本生成
function validateScriptGeneration() {
    const selectedScripts = document.querySelectorAll('.selected-script-item');
    if (selectedScripts.length === 0) {
        alert('请至少选择一个脚本');
        return false;
    }
    return true;
}

// 验证视频混剪
function validateVideoMixing() {
    return true;
}

// 识别商品
function identifyProduct() {
    const productId = document.getElementById('productId').value;
    
    if (!productId.trim()) {
        alert('请输入商品ID或链接');
        return;
    }
    
    // 模拟识别商品
    console.log('识别商品:', productId);
    console.log('当前步骤:', currentStep);
    
    // 显示加载状态
    const identifyBtn = document.querySelector('.btn-primary');
    const originalText = identifyBtn.textContent;
    identifyBtn.textContent = '识别中...';
    identifyBtn.disabled = true;
    
    // 模拟API调用延迟
    setTimeout(() => {
        // 显示商品信息
        const productInfo = document.getElementById('productInfo');
        const productName = document.getElementById('productName');
        const productLink = document.getElementById('productLink');
        
        if (productInfo && productName && productLink) {
            // 模拟商品数据
            productName.textContent = '儿童纯棉百搭小清新碎花上衣';
            productLink.textContent = 'https://detail.vip.com/detail-1710616752-6920810386380828624.html';
            
            // 更新商品图片
            const productImage = document.getElementById('productImage');
            if (productImage) {
                productImage.src = 'https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png';
            }
            
            productInfo.style.display = 'block';
        }
        
        // 显示AI商品信息
        const aiProductInfo = document.getElementById('aiProductInfo');
        if (aiProductInfo) {
            aiProductInfo.style.display = 'block';
        }
        
        // 显示爆款方案
        const hotSchemes = document.getElementById('hotSchemes');
        if (hotSchemes) {
            hotSchemes.style.display = 'block';
        }
        
        // 显示自定义区域
        const customSection = document.getElementById('customSection');
        if (customSection) {
            customSection.style.display = 'block';
        }
        

        
        // 恢复按钮状态
        identifyBtn.textContent = originalText;
        identifyBtn.disabled = false;
        
        // 不再自动进入下一步，让用户手动选择
        console.log('商品识别完成，等待用户选择卖点');
    }, 2000);
}

// 加载素材
function loadMaterials() {
    console.log('加载商品素材...');
    // 这里可以添加实际的素材加载逻辑
    // 目前使用模拟数据
}

// 打开上传弹窗
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.add('show');
}

// 关闭上传弹窗
function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.remove('show');
}

// 确认上传
function confirmUpload() {
    closeUploadModal();
    openUploadProgressModal();
    
    // 模拟上传过程
    simulateUpload();
}

// 打开上传进度弹窗
function openUploadProgressModal() {
    const modal = document.getElementById('uploadProgressModal');
    modal.classList.add('show');
    
    // 添加模拟的上传项目
    addUploadItems();
}

// 关闭上传进度弹窗
function closeUploadProgressModal() {
    const modal = document.getElementById('uploadProgressModal');
    modal.classList.remove('show');
}

// 添加上传项目
function addUploadItems() {
    const uploadList = document.getElementById('uploadList');
    uploadList.innerHTML = '';
    
    // 模拟上传项目
    const uploadItems = [
        { name: '自运营实拍视频1.mp4', progress: 0 },
        { name: '自运营实拍视频2.mp4', progress: 0 },
        { name: '自运营实拍视频3.mp4', progress: 0 }
    ];
    
    uploadItems.forEach((item, index) => {
        const uploadItem = createUploadItem(item, index);
        uploadList.appendChild(uploadItem);
    });
}

// 创建上传项目元素
function createUploadItem(item, index) {
    const uploadItem = document.createElement('div');
    uploadItem.className = 'upload-item';
    uploadItem.innerHTML = `
        <div class="upload-item-thumbnail">
            <img src="https://via.placeholder.com/40x40/90EE90/000000?text=视频" alt="视频">
        </div>
        <div class="upload-item-info">
            <div class="upload-item-name">${item.name}</div>
            <div class="upload-progress">
                <div class="upload-progress-bar" style="width: ${item.progress}%"></div>
            </div>
        </div>
        <div class="upload-item-actions">
            <button class="upload-item-btn delete" onclick="deleteUploadItem(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return uploadItem;
}

// 删除上传项目
function deleteUploadItem(index) {
    const uploadItems = document.querySelectorAll('.upload-item');
    if (uploadItems[index]) {
        uploadItems[index].remove();
    }
}

// 切换卖点标签状态
function togglePointTag(tag) {
    tag.classList.toggle('active');
    
    // 检查是否可以显示下一步按钮
    validateProductIdentification();
}

// 切换商品简称标签状态（全局单选）
function toggleNameTag(tag) {
    const isActive = tag.classList.contains('active');
    
    // 如果当前标签已选中，则取消选中
    if (isActive) {
        tag.classList.remove('active');
        return;
    }
    
    // 移除页面中所有商品简称标签的选中状态（全局单选）
    const allNameTags = document.querySelectorAll('.name-tag');
    allNameTags.forEach(t => {
        t.classList.remove('active');
    });
    
    // 选中当前标签
    tag.classList.add('active');
    
    // 检查是否可以显示下一步按钮
    validateProductIdentification();
}

// 刷新AI卖点
function refreshAISellingPoints() {
    const aiSellingPoints = document.querySelector('.ai-selling-points .selling-point-tags');
    if (!aiSellingPoints) return;
    
    // 显示加载状态
    const refreshBtn = document.querySelector('.refresh-btn');
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        // 模拟新的卖点
        const newPoints = [
            '舒适透气不闷热',
            '优质纯棉面料',
            '时尚百搭款式',
            '清新淡雅设计',
            '柔软亲肤材质'
        ];
        
        // 随机选择3个卖点
        const selectedPoints = [];
        while (selectedPoints.length < 3) {
            const randomPoint = newPoints[Math.floor(Math.random() * newPoints.length)];
            if (!selectedPoints.includes(randomPoint)) {
                selectedPoints.push(randomPoint);
            }
        }
        
        // 更新卖点标签
        aiSellingPoints.innerHTML = '';
        selectedPoints.forEach(point => {
            const tag = document.createElement('span');
            tag.className = 'point-tag';
            tag.onclick = function() { togglePointTag(this); };
            tag.textContent = point;
            aiSellingPoints.appendChild(tag);
        });
        
        // 恢复按钮状态
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
    }, 1500);
}

// 添加自定义标签
function addCustomTag(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const value = input.value.trim();
        
        if (value) {
            const existingTags = document.getElementById('existingTags');
            const tag = document.createElement('span');
            tag.className = 'custom-tag';
            tag.innerHTML = `
                ${value}
                <i class="fas fa-times" onclick="removeCustomTag(this)"></i>
            `;
            existingTags.appendChild(tag);
            input.value = '';
            
            // 检查是否可以显示下一步按钮
            validateProductIdentification();
        }
    }
}

// 移除自定义标签
function removeCustomTag(icon) {
    const tag = icon.parentElement;
    tag.remove();
}



// 刷新AI生成结果（保留原有函数以兼容）
function refreshAI() {
    const resultItem = event.target.closest('.result-item');
    const resultText = resultItem.querySelector('.result-text');
    
    // 模拟AI重新生成
    const loadingText = '生成中...';
    resultText.textContent = loadingText;
    
    setTimeout(() => {
        // 模拟新的生成结果
        const newResults = [
            '2024春季新款连衣裙',
            '优雅气质连衣裙',
            '时尚百搭连衣裙',
            '显瘦显高连衣裙',
            '清新淡雅连衣裙'
        ];
        
        const randomResult = newResults[Math.floor(Math.random() * newResults.length)];
        resultText.textContent = randomResult;
    }, 1500);
}

// 移除已选择的项目
function removeItem(button) {
    const item = button.closest('.selected-item');
    item.remove();
}

// 生成脚本
function generateScript() {
    const scriptList = document.getElementById('scriptList');
    if (!scriptList) return;
    
    // 显示生成中状态
    const generateBtn = document.querySelector('.config-actions .btn-primary');
    const originalText = generateBtn.textContent;
    generateBtn.textContent = '生成中...';
    generateBtn.disabled = true;
    
    setTimeout(() => {
        // 获取当前选择的字数范围
        const wordCountRange = getSelectedWordCountRange();
        
        // 根据字数范围生成不同长度的脚本
        const scriptTemplates = getScriptTemplatesByWordCount(wordCountRange);
        
        const randomScript = scriptTemplates[Math.floor(Math.random() * scriptTemplates.length)];
        
        // 获取当前脚本数量，用于编号
        const currentScriptCount = scriptList.children.length + 1;
        
        // 创建新的脚本项目
        const scriptItem = document.createElement('div');
        scriptItem.className = 'script-item';
        scriptItem.innerHTML = `
            <div class="script-header">
                <h5>脚本${currentScriptCount}</h5>
            </div>
            <div class="script-content">
                <p>${randomScript}</p>
            </div>
            <div class="script-actions">
                <button class="btn btn-sm btn-outline" onclick="applyScript(this)">直接应用</button>
                <button class="btn btn-sm btn-outline" onclick="editScript(this)">自行修改</button>
                <button class="btn btn-sm btn-outline" onclick="regenerateScript(this)">重新生成</button>
            </div>
        `;
        
        // 添加到脚本列表顶部
        scriptList.insertBefore(scriptItem, scriptList.firstChild);
        
        // 恢复按钮状态
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
        
        showMessage(`已生成脚本${currentScriptCount}`, 'success');
    }, 2000);
}

// 初始化脚本列表（添加3条mock脚本）
function initializeScriptList() {
    const scriptList = document.getElementById('scriptList');
    if (!scriptList) return;
    
    const mockScripts = [
        '大家好，今天给大家推荐一款超美的连衣裙！这款时尚连衣裙2024新款，采用优质面料制作，舒适透气，让你在春夏季节也能美美哒~',
        '姐妹们看过来！这款连衣裙真的是绝了！时尚设计展现优雅气质，多种颜色可选，百搭款式让你轻松驾驭各种场合~',
        '今天给大家分享一款超级好穿的连衣裙，面料柔软亲肤，版型显瘦显高，无论是约会还是上班都能轻松驾驭~'
    ];
    
    mockScripts.forEach((script, index) => {
        const scriptItem = document.createElement('div');
        scriptItem.className = 'script-item';
        scriptItem.innerHTML = `
            <div class="script-header">
                <h5>脚本${index + 1}</h5>
            </div>
            <div class="script-content">
                <p>${script}</p>
            </div>
            <div class="script-actions">
                <button class="btn btn-sm btn-outline" onclick="applyScript(this)">直接应用</button>
                <button class="btn btn-sm btn-outline" onclick="editScript(this)">自行修改</button>
                <button class="btn btn-sm btn-outline" onclick="regenerateScript(this)">重新生成</button>
            </div>
        `;
        scriptList.appendChild(scriptItem);
    });
}

// 重置脚本配置
function resetScriptConfig() {
    // 重置所有输入框
    const inputs = document.querySelectorAll('.config-input');
    inputs.forEach(input => input.value = '');
    
    // 重置单选按钮到默认状态
    const scenarioRadios = document.querySelectorAll('input[name="scenario"]');
    scenarioRadios[0].checked = true;
    
    const styleRadios = document.querySelectorAll('input[name="style"]');
    styleRadios[0].checked = true;
}

// 应用脚本
function applyScript(button) {
    const scriptItem = button.closest('.script-item');
    const scriptContent = scriptItem.querySelector('.script-content p').textContent;
    
    const isActive = button.classList.contains('btn-primary');
    
    if (isActive) {
        // 如果当前是选中状态，取消选中
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline');
        
        // 从选中的脚本列表中移除
        if (!window.selectedScripts) {
            window.selectedScripts = [];
        }
        
        const index = window.selectedScripts.findIndex(script => script.content === scriptContent);
        if (index > -1) {
            window.selectedScripts.splice(index, 1);
        }
        
        showMessage('已取消选择脚本', 'info');
    } else {
        // 如果当前是未选中状态，选中当前脚本
        button.classList.remove('btn-outline');
        button.classList.add('btn-primary');
        
        // 添加到选中的脚本列表
        if (!window.selectedScripts) {
            window.selectedScripts = [];
        }
        
        window.selectedScripts.push({
            content: scriptContent,
            timestamp: new Date()
        });
        
        showMessage(`已选择脚本，当前已选择 ${window.selectedScripts.length} 个脚本`, 'success');
    }
    
    // 更新开始制作按钮的状态
    updateStartProductionButton();
}

// 更新开始制作按钮状态
function updateStartProductionButton() {
    const startBtn = document.querySelector('.results-header .btn-primary');
    if (startBtn) {
        const selectedCount = window.selectedScripts ? window.selectedScripts.length : 0;
        if (selectedCount > 0) {
            startBtn.textContent = `开始制作 (${selectedCount})`;
            startBtn.disabled = false;
        } else {
            startBtn.textContent = '开始制作';
            startBtn.disabled = false;
        }
    }
}

// 音色选择相关函数
let selectedVoiceTone = '甜美女生'; // 默认音色
let tempSelectedTone = null; // 临时选择的音色

// 打开音色选择弹窗
function openVoiceToneModal() {
    const modal = document.getElementById('voiceToneModal');
    modal.style.display = 'block';
    
    // 重置临时选择
    tempSelectedTone = selectedVoiceTone;
    
    // 更新选中状态
    updateVoiceToneSelection();
}

// 关闭音色选择弹窗
function closeVoiceToneModal() {
    const modal = document.getElementById('voiceToneModal');
    modal.style.display = 'none';
    
    // 重置临时选择
    tempSelectedTone = null;
    
    // 清除所有选中状态
    const allItems = document.querySelectorAll('.voice-tone-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });
}

// 选择音色
function selectVoiceTone(toneName, element) {
    // 清除其他选中状态
    const allItems = document.querySelectorAll('.voice-tone-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // 选中当前项
    element.classList.add('selected');
    
    // 更新临时选择
    tempSelectedTone = toneName;
}

// 更新音色选中状态显示
function updateVoiceToneSelection() {
    const allItems = document.querySelectorAll('.voice-tone-item');
    allItems.forEach(item => {
        const toneName = item.querySelector('h5').textContent;
        if (toneName === tempSelectedTone) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// 播放音色试听
function playToneDemo(toneName, event) {
    event.stopPropagation(); // 阻止事件冒泡
    
    // 这里可以实现音色试听功能
    console.log('播放音色示例:', toneName);
    showMessage(`${toneName} 音色试听中...`, 'info');
    
    // 模拟播放效果
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-volume-up"></i> 播放中...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showMessage(`${toneName} 音色试听完成`, 'success');
    }, 2000);
}

// 保存音色选择
function saveVoiceTone() {
    if (tempSelectedTone) {
        selectedVoiceTone = tempSelectedTone;
        
        // 更新显示
        const toneDisplay = document.getElementById('selectedTone');
        if (toneDisplay) {
            toneDisplay.textContent = selectedVoiceTone;
        }
        
        showMessage(`音色已设置为：${selectedVoiceTone}`, 'success');
        closeVoiceToneModal();
    } else {
        showMessage('请先选择一个音色', 'warning');
    }
}

// 使用默认音色直接创建任务
function createTasksWithDefaultVoice() {
    const scriptsToProcess = window.selectedScripts && window.selectedScripts.length > 0 
        ? window.selectedScripts 
        : [window.selectedScript];
    
    // 为每个选中的脚本创建任务，使用当前选择的音色
    scriptsToProcess.forEach((script, index) => {
        // 确定脚本来源类型
        const scriptSource = window.currentScriptMethod === 'split' ? '脚本裂变' : 'AI脚本';
        
        // 创建子任务数据来演示不同的状态
        const subTasks = [];
        if (index === 0) {
            // 第一个任务：所有子任务都完成
            subTasks.push(
                { id: 'No.1', status: 'completed' },
                { id: 'No.2', status: 'completed' },
                { id: 'No.3', status: 'completed' }
            );
        } else if (index === 1) {
            // 第二个任务：有进行中的任务
            subTasks.push(
                { id: 'No.1', status: 'completed' },
                { id: 'No.2', status: 'processing' },
                { id: 'No.3', status: 'completed' }
            );
        } else {
            // 第三个任务：有失败的任务
            subTasks.push(
                { id: 'No.1', status: 'completed' },
                { id: 'No.2', status: 'failed' },
                { id: 'No.3', status: 'completed' }
            );
        }
        
        const newTask = {
            id: window.taskManager.nextId++,
            title: `视频制作任务 ${window.taskManager.nextId - 1}`,
            description: `脚本: ${script.content.substring(0, 30)}...`,
            status: 'completed', // 直接设置为完成状态
            progress: 100,
            createdAt: new Date(),
            script: script.content,
            voice: selectedVoiceTone, // 使用当前选择的音色
            scriptSource: scriptSource, // 脚本来源
            videoThumbnail: generateVideoThumbnail(script.content), // 生成视频缩略图
            videoDuration: generateVideoDuration(script.content), // 生成视频时长
            videoFileSize: generateVideoFileSize(), // 生成文件大小
            subTasks: subTasks // 添加子任务数据
        };
        
        // 添加到任务列表
        window.taskManager.tasks.unshift(newTask);
        
        // 静态状态，不进行进度模拟
        // simulateTaskProgress(newTask.id);
    });
    
    // 更新任务显示
    updateTaskCount();
    
    // 显示任务创建成功提示
    const taskCount = scriptsToProcess.length;
    showMessage(`已创建 ${taskCount} 个视频制作任务！音色：${selectedVoiceTone}。您可以在右上角任务列表中查看进度。`, 'success');
    
    // 清理选择状态
    window.selectedScript = null;
    window.selectedScripts = [];
    
    // 重置所有脚本按钮状态
    const allApplyButtons = document.querySelectorAll('.script-actions .btn');
    allApplyButtons.forEach(btn => {
        if (btn.textContent === '直接应用' || btn.textContent.includes('直接应用')) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        }
    });
    
    // 更新开始制作按钮
    updateStartProductionButton();
    
    // 自动打开任务列表
    openTaskDrawer();
}

// 生成视频缩略图URL
function generateVideoThumbnail(scriptContent) {
    // 根据脚本内容生成不同的缩略图
    const thumbnails = [
        'https://via.placeholder.com/200x150/90EE90/000000?text=视频封面1',
        'https://via.placeholder.com/200x150/87CEEB/000000?text=视频封面2',
        'https://via.placeholder.com/200x150/DDA0DD/000000?text=视频封面3',
        'https://via.placeholder.com/200x150/FFB6C1/000000?text=视频封面4',
        'https://via.placeholder.com/200x150/F0E68C/000000?text=视频封面5'
    ];
    
    // 根据脚本内容哈希选择缩略图
    const hash = scriptContent.length % thumbnails.length;
    return thumbnails[hash];
}

// 生成视频时长
function generateVideoDuration(scriptContent) {
    // 根据脚本字数估算时长
    const wordCount = scriptContent.length;
    const estimatedSeconds = Math.max(10, Math.min(60, Math.floor(wordCount / 3)));
    const minutes = Math.floor(estimatedSeconds / 60);
    const seconds = estimatedSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 生成视频文件大小
function generateVideoFileSize() {
    // 随机生成文件大小
    const sizes = ['15.2MB', '23.8MB', '18.5MB', '31.2MB', '25.6MB', '20.1MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

// 编辑脚本
function editScript(button) {
    const scriptItem = button.closest('.script-item');
    const scriptContent = scriptItem.querySelector('.script-content p');
    const currentText = scriptContent.textContent;
    
    // 创建编辑框
    const textarea = document.createElement('textarea');
    textarea.value = currentText;
    textarea.className = 'custom-textarea';
    textarea.style.marginTop = '10px';
    
    scriptContent.parentNode.appendChild(textarea);
    scriptContent.style.display = 'none';
    
    // 更新按钮
    button.textContent = '保存';
    button.onclick = function() {
        scriptContent.textContent = textarea.value;
        scriptContent.style.display = 'block';
        textarea.remove();
        button.textContent = '自行修改';
        button.onclick = editScript;
    };
}

// 重新生成脚本
function regenerateScript(button) {
    const scriptItem = button.closest('.script-item');
    const scriptList = document.getElementById('scriptList');
    
    // 显示生成中状态
    button.textContent = '生成中...';
    button.disabled = true;
    
    setTimeout(() => {
        // 模拟新的脚本内容
        const newScripts = [
            '这款连衣裙真的是太美了！时尚设计展现优雅气质，多种颜色可选，百搭款式让你轻松驾驭各种场合~',
            '姐妹们看过来！这款连衣裙真的是绝了！优质面料舒适透气，让你在春夏季节也能美美哒~',
            '今天给大家推荐一款超美的连衣裙！这款时尚连衣裙2024新款，采用优质面料制作，舒适透气~',
            '这款连衣裙真的是我的心头爱！荷叶领设计甜美可爱，纯棉面料透气舒适，春夏季节必备单品~',
            '姐妹们一定要看这款连衣裙！版型显瘦显高，面料柔软亲肤，无论是约会还是上班都能轻松驾驭~',
            '这款连衣裙真的是绝了！时尚百搭设计，让你轻松驾驭各种场合，绝对是衣橱必备单品~'
        ];
        
        const randomScript = newScripts[Math.floor(Math.random() * newScripts.length)];
        
        // 获取当前脚本数量，用于编号
        const currentScriptCount = scriptList.children.length + 1;
        
        // 创建新的脚本项目
        const newScriptItem = document.createElement('div');
        newScriptItem.className = 'script-item';
        newScriptItem.innerHTML = `
            <div class="script-header">
                <h5>脚本${currentScriptCount}</h5>
            </div>
            <div class="script-content">
                <p>${randomScript}</p>
            </div>
            <div class="script-actions">
                <button class="btn btn-sm btn-outline" onclick="applyScript(this)">直接应用</button>
                <button class="btn btn-sm btn-outline" onclick="editScript(this)">自行修改</button>
                <button class="btn btn-sm btn-outline" onclick="regenerateScript(this)">重新生成</button>
            </div>
        `;
        
        // 在当前脚本下方插入新脚本
        scriptItem.parentNode.insertBefore(newScriptItem, scriptItem.nextSibling);
        
        // 恢复按钮状态
        button.textContent = '重新生成';
        button.disabled = false;
        
        showMessage(`已重新生成脚本${currentScriptCount}`, 'success');
    }, 2000);
}

// 移除脚本
function removeScript(button) {
    const scriptItem = button.closest('.selected-script-item');
    scriptItem.remove();
}

// 开始制作
function startProduction() {
    // 检查是否已选择脚本
    if (!window.selectedScripts || window.selectedScripts.length === 0) {
        showMessage('请先选择至少一个脚本', 'warning');
        return;
    }
    
    // 使用第一个选中的脚本作为主脚本（向后兼容）
    window.selectedScript = window.selectedScripts[0];
    
    // 直接创建任务，使用默认音色
    createTasksWithDefaultVoice();
}



// 审核通过视频
function approveVideo() {
    alert('视频审核通过！');
    nextStep();
}

// 审核不通过视频
function rejectVideo() {
    alert('视频审核不通过，请重新制作');
}

// 编辑视频
function editVideo() {
    alert('进入视频编辑模式');
}

// 下载视频
function downloadVideo() {
    // 模拟下载
    const link = document.createElement('a');
    link.href = '#';
    link.download = '时尚连衣裙2024新款_混剪视频.mp4';
    link.click();
    
    alert('视频下载开始！');
}

// 分享视频
function shareVideo() {
    alert('分享功能开发中...');
}

// 制作新视频
function createNew() {
    startProduction();
}

// 视频混剪进度模拟
function startVideoMixing() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const videoPreview = document.getElementById('videoPreview');
    
    if (!progressFill || !progressText) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = '分析素材中...';
        } else if (progress < 60) {
            progressText.textContent = '生成脚本中...';
        } else if (progress < 90) {
            progressText.textContent = '混剪视频中...';
        } else {
            progressText.textContent = '添加配音中...';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = '混剪完成！';
            setTimeout(() => {
                if (videoPreview) videoPreview.style.display = 'block';
            }, 1000);
        }
    }, 500);
}

// 在步骤4激活时自动开始混剪
document.addEventListener('DOMContentLoaded', function() {
    // 监听步骤变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const step4 = document.getElementById('step4');
                if (step4 && step4.classList.contains('active')) {
                    setTimeout(() => {
                        startVideoMixing();
                    }, 1000);
                }
            }
        });
    });
    
    const step4 = document.getElementById('step4');
    if (step4) {
        observer.observe(step4, { attributes: true });
    }
});

// 模拟上传过程
function simulateUpload() {
    const progressBars = document.querySelectorAll('.upload-progress-bar');
    let currentProgress = 0;
    
    const interval = setInterval(() => {
        currentProgress += Math.random() * 10;
        
        progressBars.forEach((bar, index) => {
            const itemProgress = Math.min(currentProgress - (index * 20), 100);
            bar.style.width = Math.max(0, itemProgress) + '%';
        });
        
        if (currentProgress >= 100 + (progressBars.length * 20)) {
            clearInterval(interval);
            setTimeout(() => {
                closeUploadProgressModal();
                showUploadSuccess();
            }, 1000);
        }
    }, 200);
}

// 显示上传成功
function showUploadSuccess() {
    // 添加新的素材卡片到网格中
    const materialsGrid = document.querySelector('.materials-grid');
    const newMaterialCard = createMaterialCard('新上传视频', 'https://via.placeholder.com/200x200/27AE60/000000?text=新视频');
    materialsGrid.appendChild(newMaterialCard);
    
    // 显示成功提示
    alert('视频上传成功！');
}

// 创建素材卡片
function createMaterialCard(title, imageSrc) {
    const materialCard = document.createElement('div');
    materialCard.className = 'material-card';
    materialCard.innerHTML = `
        <div class="material-thumbnail">
            <img src="${imageSrc}" alt="${title}">
            <div class="material-overlay">
                <div class="material-actions">
                    <div class="dropdown">
                        <button class="dropdown-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">预览</a>
                            <a href="#" class="dropdown-item">下载</a>
                            <a href="#" class="dropdown-item">移动</a>
                            <a href="#" class="dropdown-item">隐藏</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="material-info">
            <span class="material-title">${title}</span>
            <button class="status-btn pending">待确定</button>
        </div>
    `;
    
    // 重新初始化下拉菜单
    const dropdown = materialCard.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown-btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
    
    return materialCard;
}

// 全选功能
document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.material-card input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗
    if (e.key === 'Escape') {
        closeUploadModal();
        closeUploadProgressModal();
    }
    
    // Ctrl+U 打开上传弹窗
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        openUploadModal();
    }
});

// 工具函数：显示提示信息
function showMessage(message, type = 'info') {
    // 创建提示元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // 根据类型设置背景色
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    messageEl.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(messageEl);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 配音主播选择相关函数
function openVoiceModal() {
    const modal = document.getElementById('voiceModal');
    modal.style.display = 'block';
    
    // 重置选择状态
    const voiceOptions = document.querySelectorAll('.voice-option');
    voiceOptions.forEach(option => {
        option.classList.remove('selected');
        option.addEventListener('click', selectVoiceOption);
    });
    
    // 重置确认按钮状态
    const confirmBtn = document.querySelector('#voiceModal .btn-primary');
    confirmBtn.disabled = true;
}

function closeVoiceModal() {
    const modal = document.getElementById('voiceModal');
    modal.style.display = 'none';
}

function selectVoiceOption(event) {
    const option = event.currentTarget;
    
    // 移除其他选项的选中状态
    const allOptions = document.querySelectorAll('.voice-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // 选中当前选项
    option.classList.add('selected');
    
    // 启用确认按钮
    const confirmBtn = document.querySelector('#voiceModal .btn-primary');
    confirmBtn.disabled = false;
    
    // 存储选择的配音
    window.selectedVoice = option.getAttribute('data-voice');
}

function playVoiceDemo(voiceType) {
    // 这里可以实现配音试听功能
    console.log('播放配音示例:', voiceType);
    showMessage('配音示例播放中...', 'info');
}

function confirmVoiceSelection() {
    if (!window.selectedVoice || (!window.selectedScript && (!window.selectedScripts || window.selectedScripts.length === 0))) {
        showMessage('请先选择配音主播', 'warning');
        return;
    }
    
    const scriptsToProcess = window.selectedScripts && window.selectedScripts.length > 0 
        ? window.selectedScripts 
        : [window.selectedScript];
    
    // 为每个选中的脚本创建任务
    scriptsToProcess.forEach((script, index) => {
        const newTask = {
            id: window.taskManager.nextId++,
            title: `视频制作任务 ${window.taskManager.nextId - 1}`,
            description: `脚本: ${script.content.substring(0, 30)}...`,
            status: 'processing',
            progress: 0,
            createdAt: new Date(),
            script: script.content,
            voice: window.selectedVoice
        };
        
        // 添加到任务列表
        window.taskManager.tasks.unshift(newTask);
        
        // 模拟任务进度
        simulateTaskProgress(newTask.id);
    });
    
    // 关闭弹窗
    closeVoiceModal();
    
    // 更新任务显示
    updateTaskCount();
    updateTaskDrawer();
    
    // 显示任务创建成功提示
    const taskCount = scriptsToProcess.length;
    showMessage(`已创建 ${taskCount} 个视频制作任务！您可以在右上角任务列表中查看进度。`, 'success');
    
    // 清理选择状态
    window.selectedScript = null;
    window.selectedScripts = [];
    window.selectedVoice = null;
    
    // 重置所有脚本按钮状态
    const allApplyButtons = document.querySelectorAll('.script-actions .btn');
    allApplyButtons.forEach(btn => {
        if (btn.textContent === '直接应用' || btn.textContent.includes('直接应用')) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        }
    });
    
    // 更新开始制作按钮
    updateStartProductionButton();
}

// 任务抽屉相关函数
function openTaskDrawer() {
    const drawer = document.getElementById('taskDrawer');
    const overlay = document.getElementById('taskDrawerOverlay');
    
    drawer.classList.add('open');
    drawer.classList.remove('minimized');
    overlay.classList.add('show');
    
    // 只在第一次打开时更新任务列表
    updateTaskDrawer();
    
    // 添加ESC键监听
    document.addEventListener('keydown', handleTaskDrawerKeydown);
}

function closeTaskDrawer() {
    const drawer = document.getElementById('taskDrawer');
    const overlay = document.getElementById('taskDrawerOverlay');
    
    drawer.classList.remove('open', 'minimized');
    overlay.classList.remove('show');
    
    // 移除ESC键监听
    document.removeEventListener('keydown', handleTaskDrawerKeydown);
}

function minimizeTaskDrawer() {
    const drawer = document.getElementById('taskDrawer');
    const overlay = document.getElementById('taskDrawerOverlay');
    
    if (drawer.classList.contains('minimized')) {
        // 如果已最小化，则恢复
        drawer.classList.remove('minimized');
        overlay.classList.add('show');
    } else {
        // 最小化
        drawer.classList.add('minimized');
        overlay.classList.remove('show');
    }
}

function handleTaskDrawerKeydown(event) {
    if (event.key === 'Escape') {
        closeTaskDrawer();
    }
}

function updateTaskCount() {
    const taskCount = document.getElementById('taskCount');
    if (!window.taskManager) return;
    
    const processingTasks = window.taskManager.tasks.filter(task => task.status === 'processing').length;
    taskCount.textContent = processingTasks;
}

function updateTaskDrawer(tasks = null) {
    const taskList = document.getElementById('drawerTaskList');
    if (!taskList || !window.taskManager) return;
    
    // 检查是否已经初始化过
    const isInitialized = taskList.hasAttribute('data-initialized');
    
    if (!isInitialized) {
        taskList.innerHTML = '';
        taskList.setAttribute('data-initialized', 'true');
        
        const tasksToShow = tasks || window.taskManager.tasks;
        
        tasksToShow.forEach((task, index) => {
            const taskItem = createTaskItem(task, index + 1);
            taskList.appendChild(taskItem);
            
            // 如果是已完成的任务，生成视频网格
            if (task.status === 'completed') {
                setTimeout(() => {
                    generateVideoGrid(task.id);
                }, 100);
            }
        });
    }
}

function createTaskItem(task, taskNumber) {
    const taskItem = document.createElement('div');
    taskItem.className = 'drawer-task-item';
    taskItem.setAttribute('data-status', task.status);
    taskItem.setAttribute('data-task-id', task.id);
    
    const timeAgo = getTimeAgo(task.createdAt);
    const scriptPreview = task.script ? task.script.substring(0, 50) + '...' : '';
    
    // 检查任务状态，决定是否显示子任务状态
    let shouldShowSubTasks = false;
    let overallStatus = '';
    
    if (task.subTasks && task.subTasks.length > 0) {
        const hasProcessing = task.subTasks.some(subTask => subTask.status === 'processing');
        const allCompleted = task.subTasks.every(subTask => subTask.status === 'completed');
        const hasFailed = task.subTasks.some(subTask => subTask.status === 'failed');
        
        // 只有当存在进行中的任务时才显示子任务状态
        if (hasProcessing) {
            shouldShowSubTasks = true;
        } else if (allCompleted || hasFailed) {
            // 所有任务完成或存在失败时，显示整体状态
            if (allCompleted) {
                overallStatus = '<span class="task-overall-status success">✅ 任务成功</span>';
            } else if (hasFailed) {
                overallStatus = '<span class="task-overall-status failed">❌ 任务失败</span>';
            }
        }
    }
    
    // 生成子任务状态HTML（仅在需要时显示）
    let subTasksHtml = '';
    if (shouldShowSubTasks && task.subTasks) {
        subTasksHtml = '<div class="sub-tasks">';
        task.subTasks.forEach(subTask => {
            const statusIcon = getStatusIcon(subTask.status);
            const statusText = getStatusText(subTask.status);
            subTasksHtml += `<span class="sub-task-status">${subTask.id} ${statusIcon} ${statusText}</span>`;
        });
        subTasksHtml += '</div>';
    }
    
    // 移除操作按钮，只保留任务名称点击功能
    
    // 视频预览区域
    const videoPreviewHtml = task.status === 'completed' ? `
        <div class="video-preview-section">
            <div class="video-grid" id="videoGrid-${task.id}">
                <!-- 视频网格将在这里动态生成 -->
            </div>
        </div>
    ` : '';
    
    taskItem.innerHTML = `
        <div class="task-meta">
            <h4 class="task-title" onclick="viewTaskDetails(${task.id})" style="cursor: pointer;">
                ${task.id}-${task.title}
                ${overallStatus}
            </h4>
            <span class="task-time">${timeAgo}</span>
        </div>
        ${videoPreviewHtml}
        ${subTasksHtml}
    `;
    
    return taskItem;
}

// 生成视频网格
function generateVideoGrid(taskId) {
    const task = window.taskManager.tasks.find(t => t.id == taskId);
    if (!task || task.status !== 'completed') return;
    
    const videos = generateTaskVideos(task);
    const videoGrid = document.getElementById(`videoGrid-${taskId}`);
    if (!videoGrid) return;
    
    videoGrid.innerHTML = videos.map((video, index) => `
        <div class="video-grid-item" onmouseenter="showVideoPreview('${taskId}-${index}')" onmouseleave="hideVideoPreview('${taskId}-${index}')">
            <div class="video-thumbnail-container">
                <img src="${video.thumbnail}" alt="视频${index + 1}" class="video-thumbnail">
                <div class="script-source-badge">${video.scriptSource}</div>
                ${video.badge ? `<div class="video-badge">${video.badge}</div>` : ''}
                <div class="video-overlay" id="overlay-${taskId}-${index}">
                    <button class="preview-btn" onclick="openVideoPreview('${taskId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <div class="script-preview">${task.script ? task.script.substring(0, 60) + '...' : '暂无脚本内容'}</div>
                    <div class="video-actions">
                        <button class="btn btn-sm btn-primary" onclick="saveToVideoLibrary('${taskId}')">保存</button>
                        <button class="btn btn-sm btn-outline" onclick="editVideo('${taskId}')">编辑</button>
                    </div>
                </div>
            </div>
            <div class="video-info">
                <div class="video-duration">${video.duration}</div>
                <div class="video-size">${video.fileSize}</div>
                <div class="script-number">脚本${getChineseNumber(index + 1)}</div>
            </div>
        </div>
    `).join('');
}

// 获取中文数字
function getChineseNumber(num) {
    const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    return chineseNumbers[num - 1] || num.toString();
}

// 获取状态图标
function getStatusIcon(status) {
    const icons = {
        'completed': '✅',
        'processing': '⏳',
        'failed': '❌'
    };
    return icons[status] || '⏳';
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    if (minutes > 0) return `${minutes}分钟前`;
    return '刚刚';
}

function getStatusText(status) {
    const statusMap = {
        'processing': '进行中',
        'completed': '已完成',
        'failed': '失败'
    };
    return statusMap[status] || status;
}

// 视频预览相关函数
function showVideoPreview(taskId) {
    const overlay = document.getElementById(`overlay-${taskId}`);
    if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    }
}

function hideVideoPreview(taskId) {
    const overlay = document.getElementById(`overlay-${taskId}`);
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
}

function openVideoPreview(taskId) {
    // 打开视频预览页面
    openVideoPreviewModal(taskId);
}

function saveToVideoLibrary(taskId) {
    const task = window.taskManager.tasks.find(t => t.id == taskId);
    if (task) {
        showMessage(`视频已保存到视频库：${task.title}`, 'success');
        // 这里可以添加保存到视频库的逻辑
    }
}

function editVideo(taskId) {
    const task = window.taskManager.tasks.find(t => t.id == taskId);
    if (task) {
        showMessage(`跳转到视频编辑页面：${task.title}`, 'info');
        // 打开视频编辑页面
        openVideoEditor(taskId);
    }
}

// 打开视频编辑页面
function openVideoEditor(taskId) {
    const modal = document.getElementById('videoEditorModal');
    modal.style.display = 'flex';
    
    // 初始化编辑页面
    initializeVideoEditor(taskId);
    
    // 添加点击背景关闭功能
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoEditor();
        }
    });
}

// 关闭视频编辑页面
function closeVideoEditor() {
    const modal = document.getElementById('videoEditorModal');
    modal.style.display = 'none';
}

// 初始化视频编辑页面
function initializeVideoEditor(taskId) {
    // 初始化音色选择
    initializeVoiceGrid();
    
    // 初始化时间轴
    initializeTimeline();
    
    // 初始化视频播放器
    initializeEditorVideoPlayer();
    
    // 更新字符计数
    updateCharacterCount();
}

// 初始化音色网格
function initializeVoiceGrid() {
    const voiceGrid = document.getElementById('voiceGrid');
    const voices = [
        { name: '柔和女声', desc: '温柔细腻', duration: '48s' },
        { name: '磁性男声', desc: '低沉有力', duration: '52s' },
        { name: '活力少年', desc: '青春阳光', duration: '45s' },
        { name: '知性女声', desc: '优雅知性', duration: '50s' },
        { name: '可爱童声', desc: '天真活泼', duration: '42s' },
        { name: '成熟男声', desc: '稳重专业', duration: '55s' },
        { name: '甜美女生', desc: '甜美动人', duration: '46s' },
        { name: '商务男声', desc: '专业商务', duration: '53s' }
    ];
    
    voiceGrid.innerHTML = voices.map((voice, index) => `
        <div class="voice-option ${index === 0 ? 'selected' : ''}" onclick="selectVoiceOption(${index})">
            <div class="voice-info">
                <div class="voice-name">${voice.name}</div>
                <div class="voice-desc">${voice.desc}</div>
            </div>
            <div class="voice-duration">${voice.duration}</div>
        </div>
    `).join('');
}

// 选择音色选项
function selectVoiceOption(index) {
    const voiceOptions = document.querySelectorAll('.voice-option');
    voiceOptions.forEach((option, i) => {
        option.classList.toggle('selected', i === index);
    });
    
    showMessage(`已选择音色：${voiceOptions[index].querySelector('.voice-name').textContent}`, 'success');
}

// 切换音色标签页
function switchVoiceTab(tab) {
    const tabs = document.querySelectorAll('.voice-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // 这里可以根据标签页切换不同的音色选项
    showMessage(`切换到${event.target.textContent}模式`, 'info');
}

// 更新字符计数
function updateCharacterCount() {
    const textarea = document.getElementById('scriptText');
    const charCount = document.getElementById('charCount');
    const count = textarea.value.length;
    charCount.textContent = count;
}

// 更新语速
function updateSpeechRate() {
    const slider = document.getElementById('speechRate');
    const value = document.getElementById('speechRateValue');
    value.textContent = slider.value;
}

// 更新音量
function updateToneVolume() {
    const slider = document.getElementById('toneVolume');
    const value = document.getElementById('toneVolumeValue');
    value.textContent = slider.value + '%';
}

// 保存到草稿
function saveToDraft() {
    showMessage('已保存到草稿', 'success');
}

// 发布视频
function publishVideo() {
    showMessage('视频发布成功！', 'success');
    setTimeout(() => {
        closeVideoEditor();
    }, 1500);
}

// 初始化时间轴
function initializeTimeline() {
    // 这里可以添加时间轴初始化逻辑
}

// 初始化编辑器视频播放器
function initializeEditorVideoPlayer() {
    const videoPlayer = document.getElementById('editorVideoPlayer');
    
    if (videoPlayer) {
        // 设置视频源
        videoPlayer.src = 'https://www.w3school.com.cn/i/movie.mp4';
        videoPlayer.load();
        
        // 监听视频加载完成事件
        videoPlayer.addEventListener('loadedmetadata', function() {
            console.log('视频加载完成，时长:', videoPlayer.duration);
        });
        
        // 监听播放错误
        videoPlayer.addEventListener('error', function() {
            console.error('视频播放错误');
        });
    }
}

// 初始化时间轴
function initializeTimeline() {
    const timelineTrack = document.getElementById('timelineTrack');
    const segments = [
        { id: 1, thumbnail: 'https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png' },
        { id: 2, thumbnail: 'https://youke1.picui.cn/s1/2025/08/25/68abd1330b651.png' },
        { id: 3, thumbnail: 'https://youke1.picui.cn/s1/2025/08/25/68abd13504421.jpg' },
        { id: 4, thumbnail: 'https://youke1.picui.cn/s1/2025/08/25/68abd13484aea.png' }
    ];
    
    timelineTrack.innerHTML = segments.map((segment, index) => `
        <div class="timeline-segment ${index === 0 ? 'selected' : ''}" onclick="selectTimelineSegment(${index})">
            <img src="${segment.thumbnail}" alt="片段${segment.id}">
            <div class="segment-number">${segment.id}</div>
        </div>
    `).join('');
}

// 选择时间轴片段
function selectTimelineSegment(index) {
    const segments = document.querySelectorAll('.timeline-segment');
    segments.forEach((segment, i) => {
        segment.classList.toggle('selected', i === index);
    });
    
    // 更新视频播放器显示对应的片段
    updateVideoPlayer(index);
    
    showMessage(`已选择片段 ${index + 1}`, 'info');
}

// 更新视频播放器
function updateVideoPlayer(segmentIndex) {
    const videoPlayer = document.getElementById('editorVideoPlayer');
    const overlayText = document.querySelector('.video-overlay-text');
    
    // 这里可以根据片段索引切换不同的视频源
    const videoSources = [
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    ];
    
    const overlayTexts = [
        '夏日赫本风波点裙',
        '清新优雅设计风格',
        '优质面料舒适透气',
        '经典与时尚的完美诠释'
    ];
    
    if (videoSources[segmentIndex]) {
        videoPlayer.src = videoSources[segmentIndex];
        videoPlayer.load();
    }
    
    if (overlayTexts[segmentIndex]) {
        overlayText.textContent = overlayTexts[segmentIndex];
    }
}

// 添加时间轴片段
function addTimelineSegment() {
    const timelineTrack = document.getElementById('timelineTrack');
    const newSegmentId = timelineTrack.children.length + 1;
    
    const newSegment = document.createElement('div');
    newSegment.className = 'timeline-segment';
    newSegment.onclick = () => selectTimelineSegment(newSegmentId - 1);
    newSegment.innerHTML = `
        <img src="https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png" alt="片段${newSegmentId}">
        <div class="segment-number">${newSegmentId}</div>
    `;
    
    timelineTrack.appendChild(newSegment);
    showMessage(`已添加片段 ${newSegmentId}`, 'success');
}

// 初始化编辑器视频播放器
function initializeEditorVideoPlayer() {
    const videoPlayer = document.getElementById('editorVideoPlayer');
    
    // 监听视频播放进度
    videoPlayer.addEventListener('timeupdate', function() {
        const progressFill = document.getElementById('videoProgressFill');
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');
        
        if (progressFill && currentTime && totalTime) {
            const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            progressFill.style.width = progress + '%';
            
            currentTime.textContent = formatTime(videoPlayer.currentTime);
            totalTime.textContent = formatTime(videoPlayer.duration);
        }
    });
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 保存到草稿
function saveToDraft() {
    showMessage('已保存到草稿', 'success');
}

// 发布视频
function publishVideo() {
    showMessage('视频发布成功！', 'success');
    setTimeout(() => {
        closeVideoEditor();
    }, 1500);
}

// 视频库相关函数
function showVideoLibrary() {
    const modal = document.getElementById('videoLibraryModal');
    modal.style.display = 'flex';
    
    // 初始化视频库数据
    initializeVideoLibrary();
}

function closeVideoLibrary() {
    const modal = document.getElementById('videoLibraryModal');
    modal.style.display = 'none';
}

// 初始化视频库
function initializeVideoLibrary() {
    // 生成模拟视频数据
    const videoData = generateVideoLibraryData();
    
    // 保存到全局变量
    window.videoLibraryData = videoData;
    
    // 渲染视频网格
    renderVideoLibraryGrid(videoData);
    
    // 更新结果计数
    updateResultCount(videoData.length);
}

// 生成模拟视频库数据
function generateVideoLibraryData() {
    const videos = [];
    const thumbnails = [
        'https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png',
        'https://youke1.picui.cn/s1/2025/08/25/68abd1330b651.png',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13504421.jpg',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13484aea.png'
    ];
    
    const productIds = [
        '6921298477540574538',
        '6921298477540574539',
        '6921298477540574540',
        '6921298477540574541',
        '6921298477540574542',
        '6921298477540574543',
        '6921298477540574544',
        '6921298477540574545',
        '6921298477540574546',
        '6921298477540574547',
        '6921298477540574548',
        '6921298477540574549'
    ];
    
    const taskIds = [
        '6921298477540574538',
        '6921346563316532949',
        '6921457890123456789',
        '6921568901234567890',
        '6921679012345678901',
        '6921780123456789012'
    ];
    
    const taskNames = [
        '儿童纯棉百搭小清新碎花上衣',
        '夏季T恤视频制作',
        '连衣裙推广视频',
        '运动鞋广告制作',
        '化妆品宣传视频',
        '家居用品展示'
    ];
    
    const oaAccounts = ['david01.chen', 'alice.wang', 'bob.zhang', 'carol.li'];
    const durations = ['15S', '18S', '20S', '22S', '25S'];
    const prices = ['¥89', '¥78', '¥99', '¥128', '¥156'];
    
    for (let i = 1; i <= 68; i++) {
        const randomTaskIndex = Math.floor(Math.random() * taskIds.length);
        videos.push({
            id: i,
            number: `NO.${i}`,
            productId: productIds[Math.floor(Math.random() * productIds.length)],
            taskId: taskIds[randomTaskIndex],
            taskName: taskNames[randomTaskIndex],
            oaAccount: oaAccounts[Math.floor(Math.random() * oaAccounts.length)],
            thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
            duration: durations[Math.floor(Math.random() * durations.length)],
            price: Math.random() > 0.5 ? prices[Math.floor(Math.random() * prices.length)] : null,
            status: Math.random() > 0.3 ? 'passed' : 'failed', // 通过或未通过
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // 随机30天内
        });
    }
    
    return videos;
}

// 渲染视频库网格
function renderVideoLibraryGrid(videos) {
    const grid = document.getElementById('videoLibraryGrid');
    if (!grid) return;
    
          grid.innerHTML = videos.map(video => `
          <div class="library-video-item">
             <div class="library-video-thumbnail" 
                  onclick="playVideo(${video.id})" 
                  onmouseenter="switchToProcessed(${video.id})"
                  onmouseleave="switchToOriginal(${video.id})"
                  data-video-id="${video.id}">
                 <img class="video-preview-img" src="${video.thumbnail}" alt="视频${video.id}" data-original="${video.thumbnail}" data-processed="${video.thumbnail.replace('.png', '_processed.png').replace('.jpg', '_processed.jpg')}">
                 <div class="play-btn">
                     <i class="fas fa-play"></i>
                 </div>
                 
                 <!-- 视频类型指示器 -->
                 <div class="video-type-indicator">
                     <div class="indicator-item active" data-type="original">
                         <i class="fas fa-video"></i>
                         <span>原片</span>
                     </div>
                     <div class="indicator-item" data-type="processed">
                         <i class="fas fa-magic"></i>
                         <span>优化</span>
                     </div>
                 </div>
                 
                 <!-- 处理状态标签 -->
                 <div class="processing-status" style="display: none;">
                     <div class="processing-tags">
                         <span class="tag">降噪</span>
                         <span class="tag">增强</span>
                         <span class="tag">调色</span>
                     </div>
                 </div>
                 
                 <div class="video-duration">15s</div>
                 <div class="checkbox" onclick="toggleVideoSelection(event, ${video.id})"></div>
                 ${video.price ? `<div class="price-tag">${video.price}</div>` : ''}
             </div>
            <div class="library-video-info">
                <div class="video-id">商品ID: ${video.productId}</div>
                <div class="video-task-id">任务ID: ${video.taskId}</div>
                <div class="video-task-name">任务名称: ${video.taskName}</div>
                <div class="video-status">
                    <label class="toggle-switch">
                        <input type="checkbox" ${video.status === 'passed' ? 'checked' : ''} onchange="toggleVideoStatus(${video.id}, this.checked)">
                        <span class="toggle-slider"></span>
                        <span class="toggle-label">${video.status === 'passed' ? '通过' : '未通过'}</span>
                    </label>
                </div>
                <div class="library-video-actions">
                    <button class="btn btn-sm btn-outline" onclick="editLibraryVideo(${video.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="deleteLibraryVideo(${video.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 切换到预处理视频预览
function switchToProcessed(videoId) {
    const thumbnail = document.querySelector(`[data-video-id="${videoId}"]`);
    if (!thumbnail) return;
    
    const img = thumbnail.querySelector('.video-preview-img');
    const indicators = thumbnail.querySelectorAll('.indicator-item');
    const processingStatus = thumbnail.querySelector('.processing-status');
    const duration = thumbnail.querySelector('.video-duration');
    
    if (img) {
        img.src = img.dataset.processed;
        img.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
    }
    
    // 更新指示器状态
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (indicator.dataset.type === 'processed') {
            indicator.classList.add('active');
        }
    });
    
    // 显示处理状态标签
    if (processingStatus) {
        processingStatus.style.display = 'block';
    }
    
    // 更新时长（预处理后通常会略短）
    if (duration) {
        duration.textContent = '12s';
    }
}

// 切换到原视频预览
function switchToOriginal(videoId) {
    const thumbnail = document.querySelector(`[data-video-id="${videoId}"]`);
    if (!thumbnail) return;
    
    const img = thumbnail.querySelector('.video-preview-img');
    const indicators = thumbnail.querySelectorAll('.indicator-item');
    const processingStatus = thumbnail.querySelector('.processing-status');
    const duration = thumbnail.querySelector('.video-duration');
    
    if (img) {
        img.src = img.dataset.original;
        img.style.filter = 'none';
    }
    
    // 更新指示器状态
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (indicator.dataset.type === 'original') {
            indicator.classList.add('active');
        }
    });
    
    // 隐藏处理状态标签
    if (processingStatus) {
        processingStatus.style.display = 'none';
    }
    
    // 恢复原始时长
    if (duration) {
        duration.textContent = '15s';
    }
}

// 播放视频
function playVideo(videoId) {
    const thumbnail = document.querySelector(`[data-video-id="${videoId}"]`);
    const activeIndicator = thumbnail?.querySelector('.indicator-item.active');
    const videoType = activeIndicator?.dataset.type === 'processed' ? '预处理视频' : '原视频';
    
    showMessage(`播放${videoType} ${videoId}`, 'info');
    // 这里可以添加视频播放逻辑
}

// ===== 原料库视频预览菜单功能 =====

// 切换预览菜单显示/隐藏
function toggleMaterialPreviewMenu(materialId) {
    // 先关闭所有其他菜单
    const allMenus = document.querySelectorAll('.material-preview-menu');
    allMenus.forEach(menu => {
        if (menu.id !== `materialMenu_${materialId}`) {
            menu.style.display = 'none';
        }
    });
    
    // 切换当前菜单
    const currentMenu = document.getElementById(`materialMenu_${materialId}`);
    if (currentMenu) {
        currentMenu.style.display = currentMenu.style.display === 'none' ? 'block' : 'none';
    }
}

// 预览素材视频
function previewMaterialVideo(materialId, type) {
    const thumbnail = document.querySelector(`[data-material-id="${materialId}"]`);
    if (!thumbnail) return;
    
    const img = thumbnail.querySelector('.material-preview-img');
    const menu = document.getElementById(`materialMenu_${materialId}`);
    
    if (img) {
        // 更新图片源和样式
        if (type === 'processed') {
            img.src = img.dataset.processed;
            img.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
            img.dataset.currentType = 'processed';
        } else {
            img.src = img.dataset.original;
            img.style.filter = 'none';
            img.dataset.currentType = 'original';
        }
    }
    
    // 隐藏菜单
    if (menu) {
        menu.style.display = 'none';
    }
    
    // 显示预览消息
    const typeText = type === 'processed' ? '预处理视频' : '原片视频';
    showMessage(`正在预览${typeText} - 素材ID: ${materialId}`, 'info');
}

// 点击外部关闭菜单
document.addEventListener('click', function(e) {
    if (!e.target.closest('.preview-button-container')) {
        const allMenus = document.querySelectorAll('.material-preview-menu');
        allMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// 切换视频状态
function toggleVideoStatus(videoId, isChecked) {
    // 找到对应的视频数据
    const videoData = window.videoLibraryData || generateVideoLibraryData();
    const video = videoData.find(v => v.id === videoId);
    
    if (video) {
        // 更新状态
        video.status = isChecked ? 'passed' : 'failed';
        
        // 更新标签文本
        const toggleLabel = event.target.parentElement.querySelector('.toggle-label');
        if (toggleLabel) {
            toggleLabel.textContent = isChecked ? '通过' : '未通过';
        }
        
        // 显示提示信息
        const statusText = video.status === 'passed' ? '通过' : '未通过';
        showMessage(`视频状态已更新为: ${statusText}`, 'success');
    }
}

// 切换视频选择
function toggleVideoSelection(event, videoId) {
    event.stopPropagation();
    const checkbox = event.target;
    checkbox.classList.toggle('checked');
    
    // 更新批量导出按钮状态
    updateBatchExportButton();
}

// 更新批量导出按钮状态
function updateBatchExportButton() {
    const checkedBoxes = document.querySelectorAll('.library-video-thumbnail .checkbox.checked');
    const batchExportBtn = document.querySelector('.action-section .btn-primary');
    
    if (checkedBoxes.length > 0) {
        batchExportBtn.textContent = `批量导出 (${checkedBoxes.length})`;
    } else {
        batchExportBtn.innerHTML = '<i class="fas fa-download"></i> 批量导出';
    }
}

// 批量导出
function batchExport() {
    const checkedBoxes = document.querySelectorAll('.library-video-thumbnail .checkbox.checked');
    if (checkedBoxes.length === 0) {
        showMessage('请先选择要导出的视频', 'warning');
        return;
    }
    
    showMessage(`正在导出 ${checkedBoxes.length} 个视频...`, 'info');
    // 这里可以添加批量导出逻辑
}

// 编辑视频库视频
function editLibraryVideo(videoId) {
    showMessage(`编辑视频 ${videoId}`, 'info');
    // 这里可以添加编辑逻辑
}

// 删除视频库视频
function deleteLibraryVideo(videoId) {
    if (confirm('确定要删除这个视频吗？')) {
        showMessage(`已删除视频 ${videoId}`, 'success');
        // 这里可以添加删除逻辑
    }
}

// 清除搜索
function clearSearch(fieldId) {
    document.getElementById(fieldId).value = '';
    // 重新搜索
    searchVideos();
}

// 搜索视频
function searchVideos() {
    const productId = document.getElementById('productIdSearch').value.trim();
    const oaAccount = document.getElementById('oaAccountSearch').value.trim();
    
    // 这里可以添加搜索逻辑
    showMessage('搜索功能开发中...', 'info');
}

// 显示筛选选项
function showFilterOptions() {
    showMessage('筛选功能开发中...', 'info');
}

// 更新结果计数
function updateResultCount(count) {
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = `共为你找到${count}个相关的视频`;
    }
}

// 切换页面
function changePage(page) {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => btn.classList.remove('active'));
    
    if (page === 'prev') {
        // 上一页逻辑
        const currentActive = document.querySelector('.page-btn.active');
        const prevBtn = currentActive.previousElementSibling;
        if (prevBtn && prevBtn.classList.contains('page-btn')) {
            prevBtn.classList.add('active');
        }
    } else if (page === 'next') {
        // 下一页逻辑
        const currentActive = document.querySelector('.page-btn.active');
        const nextBtn = currentActive.nextElementSibling;
        if (nextBtn && nextBtn.classList.contains('page-btn')) {
            nextBtn.classList.add('active');
        }
    } else {
        // 具体页面
        const targetBtn = document.querySelector(`.page-btn:nth-child(${page + 1})`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }
    
    showMessage(`切换到第${page}页`, 'info');
}

// 侧边栏导航相关函数
function toggleNavGroup(element) {
    const navItem = element.closest('.nav-item');
    const submenu = navItem.querySelector('.submenu');
    const expandIcon = element.querySelector('.expand-icon');
    
    if (submenu) {
        submenu.classList.toggle('expanded');
        if (expandIcon) {
            expandIcon.classList.toggle('rotated');
        }
    }
}

// 初始化侧边栏
function initializeSidebar() {
    // 为所有带子菜单的导航项添加点击事件
    const navItemsWithSubmenu = document.querySelectorAll('.nav-item.has-submenu > .nav-link');
    
    navItemsWithSubmenu.forEach(navLink => {
        navLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleNavGroup(this);
        });
    });
    
    // 默认展开当前活跃的菜单项
    const activeNavItem = document.querySelector('.nav-link.active');
    if (activeNavItem) {
        const parentSubmenu = activeNavItem.closest('.submenu');
        if (parentSubmenu) {
            parentSubmenu.classList.add('expanded');
            const expandIcon = parentSubmenu.previousElementSibling.querySelector('.expand-icon');
            if (expandIcon) {
                expandIcon.classList.add('rotated');
            }
        }
    }
}

// 原料库相关函数
function showMaterialLibrary() {
    const modal = document.getElementById('materialLibraryModal');
    modal.style.display = 'flex';
    
    // 初始化原料库数据
    initializeMaterialLibrary();
}

function closeMaterialLibrary() {
    const modal = document.getElementById('materialLibraryModal');
    modal.style.display = 'none';
}

// 初始化原料库
function initializeMaterialLibrary() {
    // 生成模拟数据
    const materialData = generateMaterialData();
    
    // 渲染表格
    renderMaterialTable(materialData);
    
    // 初始化上传功能
    initializeUploadFunction();
}

// 生成模拟素材数据
function generateMaterialData() {
    const materials = [];
    const brands = ['Olay', 'SK-II', '兰蔻', '雅诗兰黛', '资生堂'];
    const statuses = ['draft', 'enabled', 'disabled', 'deleted'];
    const fileTypes = ['MP4', 'AVI', 'MOV', 'WMV'];
    const oaAccounts = ['david01.chen', 'alice.wang', 'bob.zhang', 'carol.li'];
    
    // 视频封面图片数组
    const videoThumbnails = [
        'https://youke1.picui.cn/s1/2025/08/25/68abd1330b651.png',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13504421.jpg',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13484aea.png'
    ];
    
    for (let i = 1; i <= 1312; i++) {
        materials.push({
            id: `MAT${String(i).padStart(6, '0')}`,
            brandName: brands[Math.floor(Math.random() * brands.length)],
            productId: `PROD${String(i).padStart(8, '0')}`,
            productName: `商品${i}`,
            batch: Math.floor(Math.random() * 10) + 1,
            materialName: `素材${i}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
            uploadTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            uploadOA: oaAccounts[Math.floor(Math.random() * oaAccounts.length)],
            thumbnail: videoThumbnails[Math.floor(Math.random() * videoThumbnails.length)],
            videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4` // 示例视频URL
        });
    }
    
    return materials;
}

// 渲染素材表格
function renderMaterialTable(materials) {
    const tbody = document.getElementById('materialTableBody');
    if (!tbody) return;
    
    // 只显示前20条数据（分页）
    const displayMaterials = materials.slice(0, 20);
    
    tbody.innerHTML = displayMaterials.map(material => `
        <tr>
            <td>
                <div class="material-video-thumbnail" data-material-id="${material.id}">
                    <img class="material-preview-img" 
                         src="${material.thumbnail}" 
                         alt="视频封面" 
                         data-original="${material.thumbnail}" 
                         data-processed="${material.thumbnail.replace('.png', '_processed.png').replace('.jpg', '_processed.jpg')}"
                         data-current-type="original">
                </div>
            </td>
            <td>${material.id}</td>
            <td>${material.brandName}</td>
            <td>${material.productId}</td>
            <td>${material.productName}</td>
            <td>${material.batch}</td>
            <td>${material.materialName}</td>
            <td><span class="status-tag status-${material.status}">${getStatusText(material.status)}</span></td>
            <td>${material.fileType}</td>
            <td>${formatDate(material.uploadTime)}</td>
            <td>${material.uploadOA}</td>
            <td class="row-actions">
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline" onclick="editMaterial('${material.id}')" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                    <div class="preview-button-container">
                        <button class="btn btn-sm btn-outline" onclick="toggleMaterialPreviewMenu('${material.id}')" title="预览">
                            <i class="fas fa-eye"></i>
                        </button>
                        <!-- 预览选项菜单 -->
                        <div class="material-preview-menu" id="materialMenu_${material.id}" style="display: none;">
                            <div class="preview-option" onclick="previewMaterialVideo('${material.id}', 'original')">
                                <i class="fas fa-video"></i>
                                <span>原片</span>
                            </div>
                            <div class="preview-option" onclick="previewMaterialVideo('${material.id}', 'processed')">
                                <i class="fas fa-magic"></i>
                                <span>预处理</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="deleteMaterial('${material.id}')" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="enableMaterial('${material.id}')" title="启用">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="disableMaterial('${material.id}')" title="屏蔽">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'draft': '草稿',
        'enabled': '启用',
        'disabled': '屏蔽',
        'deleted': '删除'
    };
    return statusMap[status] || status;
}

// 格式化日期
function formatDate(date) {
    return date.toLocaleDateString('zh-CN');
}

// 搜索素材
function searchMaterials() {
    showMessage('搜索功能开发中...', 'info');
}

// 重置筛选
function resetFilters() {
    const inputs = document.querySelectorAll('.filter-input, .filter-select');
    inputs.forEach(input => {
        if (input.type === 'date') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        } else {
            input.value = '';
        }
    });
    
    // 重置日期范围
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    showMessage('已重置筛选条件', 'success');
}

// 视频预览功能
function previewVideo(videoUrl, materialName, productName) {
    const modal = document.getElementById('videoPreviewModal');
    const video = document.getElementById('previewVideo');
    const title = document.getElementById('previewVideoTitle');
    const desc = document.getElementById('previewVideoDesc');
    
    // 设置视频源
    video.src = videoUrl;
    
    // 设置标题和描述
    title.textContent = materialName;
    desc.textContent = `商品：${productName} | 点击播放按钮开始预览视频`;
    
    // 显示弹窗
    modal.style.display = 'flex';
    
    // 自动播放（需要用户交互）
    video.load();
}

// 关闭视频预览
function closeVideoPreview() {
    const modal = document.getElementById('videoPreviewModal');
    const video = document.getElementById('previewVideo');
    
    // 停止视频播放
    video.pause();
    video.src = '';
    
    // 隐藏弹窗
    modal.style.display = 'none';
}

// 导出素材
function exportMaterials() {
    showMessage('正在导出素材数据...', 'info');
    setTimeout(() => {
        showMessage('导出成功！', 'success');
    }, 2000);
}

// 显示上传弹窗
function showUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'flex';
    
    // 重置表单
    resetUploadForm();
}

// 关闭上传弹窗
function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'none';
}

// 重置上传表单
function resetUploadForm() {
    document.getElementById('uploadProductId').value = '';
    document.getElementById('uploadBatch').value = '';
    document.querySelector('input[name="enableStatus"][value="yes"]').checked = true;
    
    // 清空文件列表
    const uploadList = document.getElementById('uploadList');
    uploadList.innerHTML = '';
    
    // 重置上传区域
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.classList.remove('dragover');
}

// 初始化上传功能
function initializeUploadFunction() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    // 点击上传区域触发文件选择
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // 文件选择事件
    fileInput.addEventListener('change', handleFileSelect);
    
    // 拖拽事件
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
}

// 处理文件选择
function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 处理文件
function handleFiles(files) {
    const uploadList = document.getElementById('uploadList');
    const currentCount = uploadList.children.length;
    
    if (currentCount + files.length > 100) {
        showMessage('总计不能超过100条视频', 'warning');
        return;
    }
    
    if (files.length > 10) {
        showMessage('单次最多上传10个文件', 'warning');
        return;
    }
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('video/')) {
            addFileToList(file);
        } else {
            showMessage(`${file.name} 不是视频文件`, 'warning');
        }
    });
}

// 添加文件到列表
function addFileToList(file) {
    const uploadList = document.getElementById('uploadList');
    const fileItem = document.createElement('div');
    fileItem.className = 'upload-item';
    fileItem.innerHTML = `
        <div class="upload-item-info">
            <i class="fas fa-video upload-item-icon"></i>
            <div>
                <div class="upload-item-name">${file.name}</div>
                <div class="upload-item-size">${formatFileSize(file.size)}</div>
            </div>
        </div>
        <button class="upload-item-remove" onclick="removeFile(this)">删除</button>
    `;
    uploadList.appendChild(fileItem);
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 删除文件
function removeFile(button) {
    button.closest('.upload-item').remove();
}

// 提交上传
function submitUpload() {
    const productId = document.getElementById('uploadProductId').value.trim();
    const batch = document.getElementById('uploadBatch').value.trim();
    const enableStatus = document.querySelector('input[name="enableStatus"]:checked').value;
    const uploadList = document.getElementById('uploadList');
    
    if (!productId) {
        showMessage('请输入商品ID', 'warning');
        return;
    }
    
    if (!batch) {
        showMessage('请输入批次号', 'warning');
        return;
    }
    
    if (uploadList.children.length === 0) {
        showMessage('请至少上传一个视频文件', 'warning');
        return;
    }
    
    // 模拟上传过程
    showMessage('正在上传素材...', 'info');
    
    setTimeout(() => {
        showMessage('素材上传成功！', 'success');
        closeUploadModal();
        
        // 刷新素材列表
        initializeMaterialLibrary();
    }, 2000);
}

// 素材操作函数
function editMaterial(materialId) {
    showMessage(`编辑素材 ${materialId}`, 'info');
}

function viewMaterial(materialId) {
    showMessage(`查看素材 ${materialId}`, 'info');
}

function deleteMaterial(materialId) {
    if (confirm('请再次确认是否删除素材？')) {
        showMessage(`素材 ${materialId} 删除成功！`, 'success');
    }
}

function enableMaterial(materialId) {
    showMessage(`素材 ${materialId} 已启用`, 'success');
}

function disableMaterial(materialId) {
    showMessage(`素材 ${materialId} 已屏蔽`, 'success');
}

function openVideoPreviewModal(taskId) {
    const task = window.taskManager.tasks.find(t => t.id == taskId);
    if (!task) return;
    
    // 获取当前任务的所有视频（模拟数据）
    const currentTaskVideos = generateTaskVideos(task);
    window.currentPreviewVideos = currentTaskVideos;
    window.currentVideoIndex = 0;
    
    // 创建视频预览弹窗
    const modal = document.createElement('div');
    modal.className = 'modal video-preview-modal';
    modal.id = 'videoPreviewModal';
    
    modal.innerHTML = `
        <div class="modal-content video-preview-content">
            <div class="modal-header">
                <h4>预览视频</h4>
                <button class="close-btn" onclick="closeVideoPreviewModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="video-preview-layout">
                    <!-- 左侧视频列表 -->
                    <div class="video-list-panel">
                        <div class="video-list-header">
                            <span>共${currentTaskVideos.length}个视频</span>
                            <label class="select-all-checkbox">
                                <input type="checkbox" checked onchange="toggleSelectAll(this)">
                                <span>全选</span>
                            </label>
                        </div>
                        <div class="video-list" id="videoList">
                            ${currentTaskVideos.map((video, index) => `
                                <div class="video-list-item ${index === 0 ? 'active' : ''}" onclick="switchVideo(${index})">
                                    <div class="video-thumbnail-small">
                                        <img src="${video.thumbnail}" alt="视频${index + 1}">
                                        ${video.badge ? `<div class="video-badge">${video.badge}</div>` : ''}
                                    </div>
                                    <div class="video-info-small">
                                        <div class="video-title-small">夏季T恤视频制作_${index}</div>
                                        <div class="video-source-small">${video.scriptSource}</div>
                                        <div class="video-duration-small">${video.duration}</div>
                                    </div>
                                    <div class="video-checkbox">
                                        <input type="checkbox" checked>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- 右侧视频播放器 -->
                    <div class="video-player-panel">
                        <div class="video-player-container">
                            <button class="nav-btn nav-prev" onclick="switchVideo(${window.currentVideoIndex - 1})">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <video controls class="video-player" id="mainVideoPlayer">
                                <source src="https://www.w3school.com.cn/i/movie.mp4" type="video/mp4">
                                您的浏览器不支持视频播放。
                            </video>
                            <button class="nav-btn nav-next" onclick="switchVideo(${window.currentVideoIndex + 1})">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="video-info-panel">
                            <div class="video-title">夏季T恤视频制作_${window.currentVideoIndex}</div>
                            <div class="script-source">脚本来源: ${currentTaskVideos[window.currentVideoIndex]?.scriptSource || 'AI脚本'}</div>
                            <div class="script-content">
                                <h5>脚本内容:</h5>
                                <p>${task.script || '夏日清新，轻松搭配。这款T恤采用优质棉质面料，透气舒适，是您夏季出行的完美选择。简约设计，百搭时尚，让您在炎热的夏天也能保持清爽优雅的形象。'}</p>
                            </div>
                            <div class="video-meta">
                                <span>时长: ${currentTaskVideos[window.currentVideoIndex]?.duration || '00:23'}</span>
                                <span>大小: ${currentTaskVideos[window.currentVideoIndex]?.fileSize || '2.1MB'}</span>
                                <span>格式: MP4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeVideoPreviewModal()">批量审阅链接</button>
                <button class="btn btn-primary" onclick="downloadVideo('${taskId}')">下载</button>
                <button class="btn btn-outline" onclick="saveToVideoLibrary('${taskId}')">保存</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // 初始化视频播放器
    initializeVideoPlayer();
}

function closeVideoPreviewModal() {
    const modal = document.getElementById('videoPreviewModal');
    if (modal) {
        modal.remove();
    }
}

function downloadVideo(taskId) {
    const task = window.taskManager.tasks.find(t => t.id == taskId);
    if (task) {
        showMessage(`开始下载视频：${task.title}`, 'info');
        // 这里可以添加下载逻辑
        setTimeout(() => {
            showMessage(`视频下载完成：${task.title}`, 'success');
        }, 2000);
    }
}

// 生成任务视频数据
function generateTaskVideos(task) {
    const baseTitle = task.title;
    const scriptSource = task.scriptSource || 'AI脚本';
    
    // 视频封面链接数组
    const videoThumbnails = [
        'https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png',
        'https://youke1.picui.cn/s1/2025/08/25/68abd1330b651.png',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13504421.jpg',
        'https://youke1.picui.cn/s1/2025/08/25/68abd13484aea.png'
    ];
    
    // 使用任务ID作为种子，确保同一个任务总是生成相同数量的视频
    const seed = task.id || 1;
    const videoCount = (seed % 5) + 1; // 1-5个视频，基于任务ID确定
    const videos = [];
    
    for (let i = 0; i < videoCount; i++) {
        const thumbnailIndex = i % videoThumbnails.length;
        const isLastVideo = i === videoCount - 1;
        
        videos.push({
            id: i + 1,
            title: `${baseTitle}_${i}`,
            scriptSource: isLastVideo ? 'AI脚本' : '爆款脚本复刻',
            duration: isLastVideo ? '00:16' : '00:23',
            thumbnail: videoThumbnails[thumbnailIndex],
            videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            badge: i === 2 ? '新人券' : null,
            fileSize: generateVideoFileSize()
        });
    }
    
    return videos;
}

// 切换视频
function switchVideo(index) {
    if (!window.currentPreviewVideos || index < 0 || index >= window.currentPreviewVideos.length) {
        return;
    }
    
    const videos = window.currentPreviewVideos;
    const video = videos[index];
    
    // 更新当前视频索引
    window.currentVideoIndex = index;
    
    // 更新视频播放器
    const videoPlayer = document.getElementById('mainVideoPlayer');
    if (videoPlayer) {
        const currentTime = videoPlayer.currentTime;
        const wasPlaying = !videoPlayer.paused;
        
        videoPlayer.src = "https://www.w3school.com.cn/i/movie.mp4";
        videoPlayer.load();
        
        // 保持播放状态
        if (wasPlaying) {
            videoPlayer.play();
        }
    }
    
    // 更新视频信息
    const videoTitle = document.querySelector('.video-title');
    const scriptSource = document.querySelector('.script-source');
    const scriptContent = document.querySelector('.script-content p');
    const videoMeta = document.querySelector('.video-meta');
    
    if (videoTitle) {
        videoTitle.textContent = `夏季T恤视频制作_${index}`;
    }
    if (scriptSource) {
        scriptSource.textContent = `脚本来源: ${video.scriptSource}`;
    }
    if (scriptContent) {
        scriptContent.textContent = '夏日清新，轻松搭配。这款T恤采用优质棉质面料，透气舒适，是您夏季出行的完美选择。简约设计，百搭时尚，让您在炎热的夏天也能保持清爽优雅的形象。';
    }
    if (videoMeta) {
        videoMeta.innerHTML = `
            <span>时长: ${video.duration}</span>
            <span>大小: ${video.fileSize}</span>
            <span>格式: MP4</span>
        `;
    }
    
    // 更新左侧列表选中状态
    const videoListItems = document.querySelectorAll('.video-list-item');
    videoListItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn) {
        prevBtn.disabled = window.currentVideoIndex <= 0;
        prevBtn.style.opacity = window.currentVideoIndex <= 0 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = window.currentVideoIndex >= window.currentPreviewVideos.length - 1;
        nextBtn.style.opacity = window.currentVideoIndex >= window.currentPreviewVideos.length - 1 ? '0.5' : '1';
    }
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const videoCheckboxes = document.querySelectorAll('.video-list-item .video-checkbox input');
    videoCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

// 初始化视频播放器
function initializeVideoPlayer() {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    if (videoPlayer) {
        // 添加键盘事件监听
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                switchVideo(window.currentVideoIndex - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                switchVideo(window.currentVideoIndex + 1);
            }
        });
        
        // 更新导航按钮状态
        updateNavigationButtons();
    }
}

function initializeTaskFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他按钮的活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            // 过滤任务
            const filter = this.getAttribute('data-filter');
            filterTasks(filter);
        });
    });
}

function filterTasks(filter) {
    const taskItems = document.querySelectorAll('.drawer-task-item');
    taskItems.forEach(item => {
        const status = item.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function viewTask(taskId) {
    const task = window.taskManager.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // 保持抽屉打开状态
    // 跳转到脚本生成页面（步骤2）
    showStep(2);
    
    // 可以在这里预填充任务相关的脚本内容
    console.log('查看任务:', task);
    showMessage('已跳转到脚本生成页面', 'info');
}

// 查看任务详情（在左侧显示脚本配置）
function viewTaskDetails(taskId) {
    const task = window.taskManager.tasks.find(t => t.id === taskId);
    if (task) {
        // 更新左侧脚本配置区域
        updateScriptConfiguration(task);
        showMessage(`已切换到任务 ${taskId} 的脚本配置`, 'success');
    }
}

// 更新脚本配置区域
function updateScriptConfiguration(task) {
    // 更新商品信息
    const productInfo = document.getElementById('productInfo');
    if (productInfo) {
        productInfo.style.display = 'block';
        const productImage = document.getElementById('productImage');
        if (productImage) {
            productImage.src = 'https://youke1.picui.cn/s1/2025/08/25/68abcee61f235.png';
        }
    }
    
    // 更新脚本内容
    const scriptTextarea = document.getElementById('scriptText');
    if (scriptTextarea) {
        scriptTextarea.value = task.script || '';
        updateCharacterCount();
    }
    
    // 更新音色选择
    if (task.voice) {
        window.selectedVoiceTone = task.voice;
        const toneDisplay = document.getElementById('selectedTone');
        if (toneDisplay) {
            toneDisplay.textContent = task.voice;
        }
    }
    
    // 更新脚本列表
    updateScriptList(task);
}

// 更新脚本列表
function updateScriptList(task) {
    const scriptList = document.getElementById('scriptList');
    if (scriptList) {
        // 清空现有脚本
        scriptList.innerHTML = '';
        
        // 添加当前任务的脚本
        const scriptItem = document.createElement('div');
        scriptItem.className = 'script-item';
        scriptItem.innerHTML = `
            <div class="script-header">
                <h5>脚本1</h5>
            </div>
            <div class="script-content">
                <p>${task.script || '暂无脚本内容'}</p>
            </div>
            <div class="script-actions">
                <button class="btn btn-sm btn-outline" onclick="applyScript(this, '${task.id}')">直接应用</button>
                <button class="btn btn-sm btn-secondary" onclick="regenerateScript('${task.id}')">重新生成</button>
            </div>
        `;
        scriptList.appendChild(scriptItem);
    }
}

function viewVideo(taskId) {
    const task = window.taskManager.tasks.find(t => t.id === taskId);
    if (!task || task.status !== 'completed') return;
    
    showMessage(`查看视频: ${task.title}`, 'success');
    console.log('查看视频:', task);
}

function downloadVideo(taskId) {
    const task = window.taskManager.tasks.find(t => t.id === taskId);
    if (!task || task.status !== 'completed') return;
    
    showMessage(`开始下载视频: ${task.title}`, 'success');
    console.log('下载视频:', task);
}

function simulateTaskProgress(taskId) {
    const task = window.taskManager.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // 静态状态，不进行自动更新
    // 注释掉自动刷新逻辑，保持任务列表稳定
    /*
    const interval = setInterval(() => {
        task.progress += Math.random() * 15 + 5; // 每次增加5-20%
        
        if (task.progress >= 100) {
            task.progress = 100;
            task.status = 'completed';
            clearInterval(interval);
            showMessage(`任务完成: ${task.title}`, 'success');
        }
        
        // 更新显示
        updateTaskCount();
        updateTaskDrawer();
    }, 3000); // 每3秒更新一次
    */
}

// 初始化任务管理
function initializeTaskManagement() {
    // 初始化任务数据
    if (!window.taskManager) {
        window.taskManager = {
            tasks: [],
            nextId: 1
        };
    }
    
    // 更新任务计数
    updateTaskCount();
    
    // 加载示例任务
    loadSampleTasks();
}

// 加载示例任务
function loadSampleTasks() {
    const sampleTasks = [
        {
            id: '6921298477540574538',
            title: '儿童纯棉百搭小清新碎花上衣',
            description: '儿童纯棉百搭小清新碎花上衣',
            status: 'processing',
            progress: 65,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
            script: '大家好，今天给大家推荐一款超美的连衣裙...',
            subTasks: [
                { id: 'NO.1', status: 'completed' },
                { id: 'NO.2', status: 'failed' },
                { id: 'NO.3', status: 'processing' },
                { id: 'NO.4', status: 'processing' },
                { id: 'NO.5', status: 'processing' }
            ]
        },
        {
            id: '6921346563316532949',
            title: '夏季T恤视频制作',
            description: '夏季T恤视频制作',
            status: 'completed',
            progress: 100,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
            script: '姐妹们看过来！这款T恤真的是绝了...',
            subTasks: [
                { id: 'NO.1', status: 'completed' },
                { id: 'NO.2', status: 'completed' },
                { id: 'NO.3', status: 'completed' },
                { id: 'NO.4', status: 'completed' },
                { id: 'NO.5', status: 'completed' }
            ]
        },
        {
            id: '6921346563316532950',
            title: '时尚连衣裙视频制作',
            description: '时尚连衣裙视频制作',
            status: 'completed',
            progress: 100,
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12小时前
            script: '今天给大家分享一款超级好穿的连衣裙...',
            subTasks: [
                { id: 'NO.1', status: 'completed' },
                { id: 'NO.2', status: 'completed' },
                { id: 'NO.3', status: 'completed' },
                { id: 'NO.4', status: 'completed' },
                { id: 'NO.5', status: 'completed' }
            ]
        }
    ];
    
    window.taskManager.tasks = sampleTasks;
    window.taskManager.nextId = 4;
    updateTaskDrawer();
}

// 任务搜索功能
function searchTasks() {
    const taskIdSearch = document.getElementById('taskIdSearch').value.trim();
    const taskNameSearch = document.getElementById('taskNameSearch').value.trim();
    
    const filteredTasks = window.taskManager.tasks.filter(task => {
        const matchId = !taskIdSearch || task.id.includes(taskIdSearch);
        const matchName = !taskNameSearch || task.title.includes(taskNameSearch) || task.description.includes(taskNameSearch);
        return matchId && matchName;
    });
    
    updateTaskDrawer(filteredTasks);
    updateTaskCount(filteredTasks.length);
}

// 重置任务搜索
function resetTaskSearch() {
    document.getElementById('taskIdSearch').value = '';
    document.getElementById('taskNameSearch').value = '';
    updateTaskDrawer();
    updateTaskCount(window.taskManager.tasks.length);
}

// 更新任务计数显示
function updateTaskCount(count) {
    const taskCountText = document.getElementById('taskCountText');
    if (taskCountText) {
        taskCountText.textContent = `共为您找到 ${count} 个相关的任务`;
    }
}

// AI裂变相关函数
function changeRecommendation() {
    const textarea = document.querySelector('.config-textarea');
    const categorySelect = document.getElementById('categorySelect');
    if (!textarea || !categorySelect) return;
    
    const selectedCategory = categorySelect.value;
    const recommendations = getRecommendationsByCategory(selectedCategory);
    
    if (recommendations && recommendations.length > 0) {
        const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
        textarea.value = randomRecommendation;
        showMessage('已更换推荐脚本', 'success');
    } else {
        showMessage('请先选择商品品类', 'warning');
    }
}

// 根据品类获取推荐脚本
function getRecommendationsByCategory(category) {
    const recommendations = {
        'clothing': [
            '给大家推荐一款绝对让你爱不释脚的男鞋——我们的经典百搭男板鞋！这款鞋子采用优质帆布面料，鞋底采用耐磨橡胶材质，不仅舒适透气，而且非常耐穿。无论是搭配牛仔裤还是休闲裤，都能轻松驾驭各种场合。鞋子的设计简约时尚，经典的黑白配色永远不会过时。最重要的是，这款鞋子的性价比超高，绝对是学生党和上班族的首选！',
            '姐妹们看过来！这款连衣裙真的是绝了！时尚设计展现优雅气质，多种颜色可选，百搭款式让你轻松驾驭各种场合。面料柔软亲肤，版型显瘦显高，无论是约会还是上班都能轻松驾驭。最重要的是，这款连衣裙的性价比超高，绝对是衣橱必备单品！',
            '这款T恤真的是太舒服了！采用100%纯棉面料，透气性好，穿着舒适。简约的设计风格，百搭不挑人，无论是搭配牛仔裤还是休闲裤都很好看。多种颜色可选，满足不同搭配需求。绝对是夏季必备单品！'
        ],
        'beauty': [
            '今天给大家推荐一款超级好用的护肤品！这款面霜采用天然植物精华，温和不刺激，适合各种肤质。质地清爽不油腻，吸收快，保湿效果好。使用后肌肤水润有光泽，绝对是护肤必备单品！',
            '这款面膜真的是太神奇了！富含玻尿酸精华，深层补水保湿，使用后肌肤水润有弹性。面膜纸贴合度很好，精华液充足，敷完后面部肌肤明显改善。绝对是护肤必备神器！',
            '这款口红真的是太美了！丝滑质地，显色度高，不易掉色。多种色号可选，满足不同场合需求。无论是日常妆容还是重要场合，都能让你光彩照人！'
        ],
        'digital': [
            '这款手机真的是太棒了！搭载最新处理器，性能强劲，运行流畅。高清摄像头，拍照效果出色，无论是日常拍照还是专业摄影都能满足需求。大容量电池，续航能力强，绝对是换机首选！',
            '这款耳机音质真的是太震撼了！采用最新降噪技术，音质清晰，低音浑厚。佩戴舒适，长时间使用也不会感到不适。无论是听音乐还是通话，都能提供出色的体验！',
            '这款平板电脑真的是太实用了！大屏幕显示效果出色，适合看视频、玩游戏、办公等多种用途。轻薄便携，续航能力强，绝对是工作和娱乐的好帮手！'
        ],
        'food': [
            '这款零食真的是太美味了！采用优质原料制作，口感酥脆，味道浓郁。多种口味可选，满足不同口味需求。独立包装，携带方便，绝对是休闲时光的最佳伴侣！',
            '这款饮料真的是太清爽了！天然果汁制作，无添加剂，健康美味。多种口味可选，满足不同喜好。冰镇后饮用更加爽口，绝对是夏季解暑必备！',
            '这款茶叶真的是太香了！精选优质茶叶，香气浓郁，口感醇厚。多种茶类可选，满足不同口味需求。无论是自己享用还是送礼都是不错的选择！'
        ],
        'home': [
            '这款床上用品真的是太舒适了！采用优质棉质面料，柔软亲肤，透气性好。简约的设计风格，百搭不挑装修风格。多种尺寸可选，满足不同床型需求。绝对是提升睡眠质量的好选择！',
            '这款厨房用品真的是太实用了！采用优质不锈钢材质，耐用不易生锈。设计合理，使用方便，能大大提高烹饪效率。多种规格可选，满足不同需求。绝对是厨房必备神器！',
            '这款收纳用品真的是太方便了！采用环保材质制作，轻便耐用。设计合理，收纳效果好，能让家居环境更加整洁。多种规格可选，满足不同收纳需求。绝对是整理家居的好帮手！'
        ],
        'sports': [
            '这款运动鞋真的是太舒适了！采用专业运动科技，缓震效果好，保护脚部健康。轻便透气，适合各种运动项目。多种颜色可选，满足不同搭配需求。绝对是运动爱好者的首选！',
            '这款运动服装真的是太棒了！采用速干面料，透气性好，运动时不会感到闷热。弹性设计，活动自如，不会束缚身体。多种款式可选，满足不同运动需求。绝对是运动必备装备！',
            '这款健身器材真的是太实用了！设计合理，使用方便，能有效锻炼身体各个部位。材质坚固，安全可靠，适合家庭使用。多种功能可选，满足不同健身需求。绝对是居家健身的好选择！'
        ]
    };
    
    return recommendations[category] || [];
}

// 根据选择的品类更新推荐脚本
function updateRecommendationByCategory() {
    const categorySelect = document.getElementById('categorySelect');
    const textarea = document.querySelector('.config-textarea');
    
    if (!categorySelect || !textarea) return;
    
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        const recommendations = getRecommendationsByCategory(selectedCategory);
        if (recommendations.length > 0) {
            textarea.value = recommendations[0]; // 默认显示第一个推荐
            showMessage(`已切换到${categorySelect.options[categorySelect.selectedIndex].text}品类推荐`, 'success');
        }
    } else {
        textarea.value = '请先选择商品品类，系统将为您推荐相应的爆款脚本。';
    }
}

function editRecommendation() {
    const textarea = document.querySelector('.config-textarea');
    if (!textarea) return;
    
    // 移除只读属性，允许编辑
    textarea.removeAttribute('readonly');
    textarea.focus();
    
    // 添加保存按钮
    const actions = document.querySelector('.recommendation-actions');
    if (actions && !actions.querySelector('.save-btn')) {
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-sm btn-primary save-btn';
        saveBtn.textContent = '保存';
        saveBtn.onclick = saveRecommendation;
        actions.appendChild(saveBtn);
    }
}

function saveRecommendation() {
    const textarea = document.querySelector('.config-textarea');
    if (!textarea) return;
    
    // 恢复只读属性
    textarea.setAttribute('readonly', true);
    
    // 移除保存按钮
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.remove();
    }
    
    showMessage('推荐脚本已保存', 'success');
}

// 跳转到脚本生成页面
function goToScriptGeneration() {
    if (validateProductIdentification()) {
        currentStep = 2;
        updateStepDisplay();
        
        // 隐藏步骤1的下一步按钮
        const step1Actions = document.getElementById('step1Actions');
        if (step1Actions) {
            step1Actions.style.display = 'none';
        }
        
        // 更新商品信息展示
        updateProductInfoDisplay();
        
        showMessage('已跳转到脚本生成页面', 'success');
    }
}

// 提交视频修改
function submitVideoChanges() {
    showMessage('正在提交修改...', 'info');
    
    setTimeout(() => {
        // 关闭视频编辑页面
        closeVideoEditor();
        
        // 创建新的重新生成任务
        const newTask = {
            id: window.taskManager.nextId++,
            title: '视频重新生成任务',
            description: '基于编辑后的配置重新生成视频',
            status: 'processing',
            progress: 0,
            createdAt: new Date(),
            script: document.getElementById('scriptText')?.value || '',
            voice: window.selectedVoiceTone || '甜美女生',
            scriptSource: 'AI脚本',
            videoThumbnail: 'https://youke1.picui.cn/s1/2025/08/25/68abd1330b651.png',
            videoDuration: '15S',
            videoFileSize: '2.5MB',
            subTasks: [
                { id: 'No.1', status: 'processing' },
                { id: 'No.2', status: 'processing' },
                { id: 'No.3', status: 'processing' }
            ]
        };
        
        // 添加到任务列表开头
        window.taskManager.tasks.unshift(newTask);
        
        // 更新任务显示
        updateTaskCount();
        updateTaskDrawer();
        
        // 打开任务抽屉
        openTaskDrawer();
        
        showMessage('视频修改已提交，正在重新生成中...', 'success');
        
        // 模拟任务进度
        simulateTaskProgress(newTask.id);
    }, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化任务管理器
    window.taskManager = {
        tasks: []
    };
    
    // 初始化选中的脚本
    window.selectedScripts = [];
    
    // 初始化选中的音色
    window.selectedVoiceTone = '甜美女生';
    
    // 初始化脚本生成方法
    window.currentScriptMethod = 'ai';
    
    // 初始化预览视频相关
    window.currentPreviewVideos = [];
    window.currentVideoIndex = 0;
    
    // 初始化脚本列表
    initializeScriptList();
    
    // 初始化任务抽屉
    updateTaskDrawer();
    
    // 初始化视频库
    initializeVideoLibrary();
    
    // 初始化侧边栏
    initializeSidebar();
});

// ===== 品类选择器相关函数 =====

// 初始化品类选择器
function initCategorySelector() {
    try {
        console.log('开始初始化品类选择器...');
        
        // 检查AI裂变面板是否可见
        const splitConfig = document.getElementById('splitConfig');
        console.log('splitConfig面板:', splitConfig);
        console.log('splitConfig是否可见:', splitConfig && splitConfig.classList.contains('active'));
        
        if (!splitConfig || !splitConfig.classList.contains('active')) {
            console.warn('AI裂变面板未激活，跳过初始化');
            return;
        }
        
        // 设置默认选择状态
        currentCategorySelection = {
            level1: { key: 'clothing', name: '服装鞋帽' },
            level2: { key: 'women', name: '女装' },
            level3: { key: 'tops', name: '上衣' }
        };
        console.log('已设置默认品类选择:', currentCategorySelection);
        
        // 生成所有级别的选项
        generateCategoryOptions();
        
        // 绑定事件处理器
        bindCategoryEventHandlers();
        
        console.log('品类选择器初始化完成');
    } catch (error) {
        console.error('初始化品类选择器时出错:', error);
    }
}

// 生成所有级别的品类选项
function generateCategoryOptions() {
    // 生成一级品类选项
    const level1Options = document.getElementById('level1Options');
    if (level1Options) {
        level1Options.innerHTML = '';
        Object.keys(categoryData).forEach(key => {
            const category = categoryData[key];
            const option = document.createElement('div');
            option.className = 'category-option';
            option.dataset.value = key;
            option.innerHTML = `
                <span class="category-option-name">${category.name}</span>
                <span class="category-option-count">${Object.keys(category.children).length}个子类</span>
            `;
            option.onclick = () => selectLevel1Category(key, category.name);
            level1Options.appendChild(option);
        });
        console.log('已生成一级品类选项');
    }
    
    // 生成二级品类选项（基于默认选择的一级品类）
    generateLevel2Options(currentCategorySelection.level1.key);
    
    // 生成三级品类选项（基于默认选择的一级和二级品类）
    generateLevel3Options(currentCategorySelection.level1.key, currentCategorySelection.level2.key);
}

// 绑定品类事件处理器
function bindCategoryEventHandlers() {
    const level1Header = document.querySelector('#level1 .category-header');
    if (level1Header) {
        level1Header.onclick = null;
        level1Header.addEventListener('click', function(e) {
            console.log('点击一级品类头部');
            e.preventDefault();
            e.stopPropagation();
            toggleCategoryLevel('level1');
        });
    }
    
    const level2Header = document.querySelector('#level2 .category-header');
    if (level2Header) {
        level2Header.onclick = null;
        level2Header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleCategoryLevel('level2');
        });
    }
    
    const level3Header = document.querySelector('#level3 .category-header');
    if (level3Header) {
        level3Header.onclick = null;
        level3Header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleCategoryLevel('level3');
        });
    }
    
    console.log('已绑定所有品类事件处理器');
}

// 切换品类级别显示/隐藏
function toggleCategoryLevel(level) {
    console.log('=== toggleCategoryLevel 被调用 ===');
    console.log('切换品类层级:', level);
    
    const levelElement = document.getElementById(level);
    console.log('找到levelElement:', levelElement);
    
    if (!levelElement) {
        console.error('未找到品类层级元素:', level);
        alert('未找到品类层级元素: ' + level);
        return;
    }
    
    const optionsElement = document.getElementById(level + 'Options');
    console.log('找到optionsElement:', optionsElement);
    
    if (!optionsElement) {
        console.error('未找到选项容器:', level + 'Options');
        alert('未找到选项容器: ' + level + 'Options');
        return;
    }
    
    const expandIcon = levelElement.querySelector('.expand-icon');
    console.log('找到expandIcon:', expandIcon);
    
    // 切换显示状态
    const isCurrentlyVisible = optionsElement.style.display === 'block';
    console.log('当前是否可见:', isCurrentlyVisible);
    
    if (isCurrentlyVisible) {
        optionsElement.style.display = 'none';
        if (expandIcon) {
            expandIcon.style.transform = 'rotate(0deg)';
        }
        console.log('已隐藏选项');
    } else {
        optionsElement.style.display = 'block';
        if (expandIcon) {
            expandIcon.style.transform = 'rotate(180deg)';
        }
        console.log('已显示选项，内容:', optionsElement.innerHTML);
        
        // 如果是重新选择上级品类，需要重置下级选择
        if (level === 'level1' && currentCategorySelection.level1) {
            // 重新选择一级品类时，清空二级和三级选择
            currentCategorySelection.level2 = null;
            currentCategorySelection.level3 = null;
            updateCategoryHeader('level2', '请选择二级品类');
            updateCategoryHeader('level3', '请选择三级品类');
            hideCategoryLevel('level2');
            hideCategoryLevel('level3');
        } else if (level === 'level2' && currentCategorySelection.level2) {
            // 重新选择二级品类时，清空三级选择
            currentCategorySelection.level3 = null;
            updateCategoryHeader('level3', '请选择三级品类');
            hideCategoryLevel('level3');
        }
        
        // 更新选择路径显示
        showSelectedCategory();
    }
}

// 选择一级品类
function selectLevel1Category(key, name) {
    console.log('选择一级品类:', key, name);
    
    currentCategorySelection.level1 = { key, name };
    currentCategorySelection.level2 = null; // 重置二级品类选择
    currentCategorySelection.level3 = null; // 重置三级品类选择
    
    updateCategoryHeader('level1', name);
    hideCategoryLevel('level1');
    
    // 重置二级和三级品类头部显示
    updateCategoryHeader('level2', '请选择二级品类');
    updateCategoryHeader('level3', '请选择三级品类');
    
    // 生成二级品类选项
    generateLevel2Options(key);
    showCategoryLevel('level2');
    
    // 隐藏三级品类
    hideCategoryLevel('level3');
    
    showSelectedCategory();
}

// 选择二级品类
function selectLevel2Category(key, name) {
    console.log('选择二级品类:', key, name);
    
    currentCategorySelection.level2 = { key, name };
    currentCategorySelection.level3 = null; // 重置三级品类选择
    
    updateCategoryHeader('level2', name);
    hideCategoryLevel('level2');
    
    // 重置三级品类头部显示
    updateCategoryHeader('level3', '请选择三级品类');
    
    // 生成三级品类选项
    generateLevel3Options(currentCategorySelection.level1.key, key);
    showCategoryLevel('level3');
    
    showSelectedCategory();
}

// 选择三级品类
function selectLevel3Category(key, name) {
    console.log('选择三级品类:', key, name);
    
    currentCategorySelection.level3 = { key, name };
    
    updateCategoryHeader('level3', name);
    hideCategoryLevel('level3');
    
    showSelectedCategory();
}

// 生成二级品类选项
function generateLevel2Options(level1Key) {
    const level2Options = document.getElementById('level2Options');
    if (!level2Options) return;
    
    level2Options.innerHTML = '';
    const level1Data = categoryData[level1Key];
    
    if (level1Data && level1Data.children) {
        Object.keys(level1Data.children).forEach(key => {
            const category = level1Data.children[key];
            const option = document.createElement('div');
            option.className = 'category-option';
            option.dataset.value = key;
            option.innerHTML = `
                <span class="category-option-name">${category.name}</span>
                <span class="category-option-count">${category.children ? Object.keys(category.children).length : 0}个子类</span>
            `;
            option.onclick = () => selectLevel2Category(key, category.name);
            level2Options.appendChild(option);
        });
    }
}

// 生成三级品类选项
function generateLevel3Options(level1Key, level2Key) {
    const level3Options = document.getElementById('level3Options');
    if (!level3Options) return;
    
    level3Options.innerHTML = '';
    const level2Data = categoryData[level1Key]?.children?.[level2Key];
    
    if (level2Data && level2Data.children) {
        Object.keys(level2Data.children).forEach(key => {
            const category = level2Data.children[key];
            const option = document.createElement('div');
            option.className = 'category-option';
            option.dataset.value = key;
            option.innerHTML = `
                <span class="category-option-name">${category.name}</span>
            `;
            option.onclick = () => selectLevel3Category(key, category.name);
            level3Options.appendChild(option);
        });
    }
}

// 更新品类头部显示
function updateCategoryHeader(level, selectedName) {
    const header = document.querySelector(`#${level} .category-placeholder`);
    if (header) {
        header.textContent = selectedName;
        header.style.color = '#333';
    }
}

// 显示品类级别
function showCategoryLevel(level) {
    const levelElement = document.getElementById(level);
    if (levelElement) {
        levelElement.style.display = 'block';
    }
}

// 隐藏品类级别
function hideCategoryLevel(level) {
    const levelElement = document.getElementById(level);
    const optionsElement = document.getElementById(level + 'Options');
    const expandIcon = levelElement?.querySelector('.expand-icon');
    
    if (optionsElement) {
        optionsElement.style.display = 'none';
    }
    if (expandIcon) {
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// 显示已选择的品类路径
function showSelectedCategory() {
    const selectedCategory = document.getElementById('selectedCategory');
    const selectedPath = document.getElementById('selectedPath');
    
    if (selectedCategory && selectedPath) {
        let path = '';
        if (currentCategorySelection.level1) {
            path += currentCategorySelection.level1.name;
            if (currentCategorySelection.level2) {
                path += ' > ' + currentCategorySelection.level2.name;
                if (currentCategorySelection.level3) {
                    path += ' > ' + currentCategorySelection.level3.name;
                }
            }
        }
        
        selectedPath.textContent = path;
        selectedCategory.style.display = path ? 'flex' : 'none';
    }
}

// 隐藏已选择的品类路径
function hideSelectedCategory() {
    const selectedCategory = document.getElementById('selectedCategory');
    if (selectedCategory) {
        selectedCategory.style.display = 'none';
    }
}

// 清空品类选择
function clearCategorySelection() {
    currentCategorySelection = {
        level1: null,
        level2: null,
        level3: null
    };
    
    // 重置所有头部显示
    updateCategoryHeader('level1', '请选择一级品类');
    updateCategoryHeader('level2', '请选择二级品类');
    updateCategoryHeader('level3', '请选择三级品类');
    
    // 隐藏所有级别
    hideCategoryLevel('level2');
    hideCategoryLevel('level3');
    
    // 隐藏已选择显示
    hideSelectedCategory();
    
    // 重新显示一级品类
    showCategoryLevel('level1');
}

// 获取当前选择的品类路径（用于推荐系统）
function getCurrentCategoryPath() {
    if (currentCategorySelection.level3) {
        return `${currentCategorySelection.level1.key}.${currentCategorySelection.level2.key}.${currentCategorySelection.level3.key}`;
    } else if (currentCategorySelection.level2) {
        return `${currentCategorySelection.level1.key}.${currentCategorySelection.level2.key}`;
    } else if (currentCategorySelection.level1) {
        return currentCategorySelection.level1.key;
    }
    return '';
}

// 更新商品信息展示
function updateProductInfoDisplay() {
    const confirmedProductTitle = document.getElementById('confirmedProductTitle');
    const confirmedSellingPoints = document.getElementById('confirmedSellingPoints');
    
    // Mock 默认数据
    const mockProductInfo = {
        title: '儿童纯棉百搭小清新碎花上衣',
        sellingPoints: ['亲肤柔软', '透气不闷热', '荷叶领口', '纯棉面料']
    };
    
    // 更新商品标题
    if (confirmedProductTitle) {
        confirmedProductTitle.textContent = mockProductInfo.title;
    }
    
    // 更新商品卖点
    if (confirmedSellingPoints) {
        confirmedSellingPoints.innerHTML = '';
        mockProductInfo.sellingPoints.forEach(point => {
            const tag = document.createElement('span');
            tag.className = 'selling-point-tag';
            tag.textContent = point;
            confirmedSellingPoints.appendChild(tag);
        });
    }
}

// 获取确认的商品信息
function getConfirmedProductInfo() {
    // 从第一步中获取选中的爆款方案信息
    const selectedScheme = getSelectedScheme();
    
    if (selectedScheme) {
        return {
            title: selectedScheme.title,
            sellingPoints: selectedScheme.sellingPoints
        };
    }
    
    return null;
}

// 获取选中的爆款方案
function getSelectedScheme() {
    // 查找选中的商品简称标签
    const selectedNameTags = document.querySelectorAll('.name-tag.selected');
    // 查找选中的卖点标签
    const selectedPointTags = document.querySelectorAll('.point-tag.selected');
    
    if (selectedNameTags.length > 0) {
        const title = selectedNameTags[0].textContent.trim();
        const sellingPoints = Array.from(selectedPointTags).map(tag => tag.textContent.trim());
        
        return {
            title: title,
            sellingPoints: sellingPoints
        };
    }
    
    return null;
}

// 更新字数范围显示（当前主要用于记录选择状态）
function updateWordCountDisplay() {
    const wordCountRange = document.getElementById('wordCountRange');
    if (wordCountRange) {
        const selectedValue = wordCountRange.value;
        console.log('选择的字数范围:', selectedValue);
        
        // 可以在这里添加其他逻辑，比如根据字数范围筛选脚本等
        // 目前主要用于记录用户的选择
        window.selectedWordCountRange = selectedValue;
    }
}

// 获取当前选择的字数范围
function getSelectedWordCountRange() {
    const wordCountRange = document.getElementById('wordCountRange');
    return wordCountRange ? wordCountRange.value : '50-75';
}

// ===== 视频编辑页面相关函数 =====

// 选择镜头
function selectShot(segmentNumber) {
    console.log('选择镜头:', segmentNumber);
    
    // 移除所有镜头的选中状态
    const allShots = document.querySelectorAll('.shot-item');
    allShots.forEach(shot => shot.classList.remove('selected'));
    
    // 移除所有脚本句子的高亮状态
    const allSentences = document.querySelectorAll('.script-sentence');
    allSentences.forEach(sentence => sentence.classList.remove('highlighted'));
    
    // 选中当前镜头
    const selectedShot = document.querySelector(`.shot-item[data-segment="${segmentNumber}"]`);
    if (selectedShot) {
        selectedShot.classList.add('selected');
    }
    
    // 高亮对应的脚本句子
    const correspondingSentence = document.querySelector(`.script-sentence[data-segment="${segmentNumber}"]`);
    if (correspondingSentence) {
        correspondingSentence.classList.add('highlighted');
        
        // 滚动到对应的脚本句子
        correspondingSentence.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // 显示选择反馈
    showMessage(`已选择镜头${segmentNumber}`, 'info');
}

// 选择脚本句子（反向选择镜头）
function selectScriptSentence(segmentNumber) {
    console.log('选择脚本句子:', segmentNumber);
    
    // 移除所有状态
    const allShots = document.querySelectorAll('.shot-item');
    const allSentences = document.querySelectorAll('.script-sentence');
    
    allShots.forEach(shot => shot.classList.remove('selected'));
    allSentences.forEach(sentence => sentence.classList.remove('highlighted'));
    
    // 选中对应的镜头和句子
    const selectedShot = document.querySelector(`.shot-item[data-segment="${segmentNumber}"]`);
    const selectedSentence = document.querySelector(`.script-sentence[data-segment="${segmentNumber}"]`);
    
    if (selectedShot) {
        selectedShot.classList.add('selected');
        
        // 滚动到对应的镜头
        selectedShot.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    if (selectedSentence) {
        selectedSentence.classList.add('highlighted');
    }
}

// 初始化视频编辑页面
function initializeVideoEditing() {
    // 为脚本句子添加点击事件
    const scriptSentences = document.querySelectorAll('.script-sentence');
    scriptSentences.forEach(sentence => {
        sentence.addEventListener('click', function() {
            const segmentNumber = this.dataset.segment;
            selectScriptSentence(parseInt(segmentNumber));
        });
    });
    
    console.log('视频编辑页面初始化完成');
}

// 预览视频
function previewVideo() {
    showMessage('正在生成视频预览...', 'info');
    
    setTimeout(() => {
        showMessage('视频预览已准备就绪！', 'success');
        // 这里可以添加实际的预览逻辑
    }, 2000);
}

// 编辑镜头
function editShots() {
    showMessage('镜头编辑功能开发中...', 'info');
    // 这里可以添加镜头编辑的逻辑
}

// 生成视频
function generateVideo() {
    showMessage('正在生成最终视频...', 'info');
    
    setTimeout(() => {
        showMessage('视频生成完成！', 'success');
        // 跳转到下载页面
        currentStep = 4;
        updateStepDisplay();
    }, 3000);
}

// 根据字数范围获取脚本模板
function getScriptTemplatesByWordCount(wordCountRange) {
    const templates = {
        '50-75': [
            '大家好，今天给大家推荐一款超美的连衣裙！这款时尚连衣裙2024新款，采用优质面料制作，舒适透气，让你在春夏季节也能美美哒~',
            '姐妹们看过来！这款连衣裙真的是绝了！时尚设计展现优雅气质，多种颜色可选，百搭款式让你轻松驾驭各种场合~',
            '今天给大家分享一款超级好穿的连衣裙，面料柔软亲肤，版型显瘦显高，无论是约会还是上班都能轻松驾驭~'
        ],
        '75-150': [
            '大家好，今天给大家推荐一款超美的儿童连衣裙！这款小清新碎花上衣采用100%纯棉面料制作，亲肤柔软透气不闷热，特别适合活泼好动的小朋友。荷叶领口设计甜美可爱，碎花图案时尚百搭，无论是日常穿搭还是聚会场合都能轻松驾驭。妈妈们快来给宝贝选购吧！',
            '姐妹们看过来！这款儿童连衣裙真的是绝了！采用优质纯棉面料，手感柔软舒适，透气性超好，宝宝穿着不会闷热。荷叶领口设计增添甜美气息，小碎花图案清新可爱，版型宽松舒适不束缚，让孩子自由活动。这样的好衣服，妈妈们一定不要错过哦！',
            '今天给大家分享一款超级好穿的儿童上衣，面料选用优质纯棉，亲肤柔软透气，宝宝穿着舒适不过敏。荷叶领口设计时尚甜美，碎花图案清新自然，无论搭配裤子还是裙子都很好看。这款上衣质量超棒，性价比很高，强烈推荐给各位妈妈！'
        ],
        '150-300': [
            '大家好，今天给大家推荐一款超美的儿童纯棉碎花上衣！作为一个有着多年育儿经验的妈妈，我深知给孩子选择衣服的重要性。这款上衣采用100%优质纯棉面料制作，经过精心挑选的棉花纤维，手感柔软细腻，透气性极佳，即使在炎热的夏天，宝宝穿着也不会感到闷热不适。荷叶领口的设计非常贴心，不仅增添了甜美可爱的气息，还能很好地修饰宝宝的脸型。小碎花图案清新自然，颜色搭配和谐，无论是搭配牛仔裤还是小裙子都非常好看。版型设计宽松舒适，不会束缚孩子的活动，让他们可以自由奔跑玩耍。这款上衣质量过硬，做工精细，性价比超高，真的是妈妈们的不二选择！',
            '姐妹们，今天必须给大家安利这款儿童纯棉上衣！我家宝宝已经穿了好几个月了，真的是越穿越喜欢。首先说说面料，这款上衣采用的是高品质纯棉材质，我特意摸过很多品牌的童装，这个手感真的是数一数二的。棉质柔软亲肤，透气性超好，我家孩子皮肤比较敏感，穿这个完全没有过敏反应。荷叶领口的设计真的太可爱了，显得宝宝特别精神，而且这个领口不会勒脖子，孩子穿着很舒服。碎花图案的选择也很用心，不会过于花哨，但又不失童趣，搭配性很强。我给孩子配过很多下装，都很好看。最重要的是，这个价格真的很实惠，质量这么好的衣服，价格却很亲民，性价比绝对没话说！',
            '各位宝妈们，今天要给大家推荐一款我觉得特别值得入手的儿童上衣！这款纯棉碎花上衣从面料到设计都让我非常满意。面料方面，选用的是优质纯棉，我专门查过这个品牌的面料来源，都是经过严格筛选的天然棉花，无添加化学物质，对孩子的皮肤非常友好。透气性也很好，我家孩子比较活泼，经常跑来跑去，穿这个上衣从来不会出现闷热的情况。设计方面，荷叶领口真的很有特色，既优雅又可爱，而且这个领口的处理很细致，边缘都做了特殊处理，不会刮到孩子的皮肤。碎花图案的配色也很考究，既有童真的感觉，又不会显得过于幼稚，随着孩子长大也不会过时。版型设计考虑到了孩子的成长需要，宽松但不臃肿，既舒适又美观。'
        ],
        '300+': [
            '大家好，今天我要给各位宝妈们详细介绍一款真正值得信赖的儿童纯棉上衣！作为一个有着十年育儿经验的妈妈，我对童装的要求可以说是非常严格的。这款儿童纯棉百搭小清新碎花上衣，从我第一眼看到就被它的品质所吸引。首先，让我们来谈谈面料。这款上衣采用的是100%优质长绒棉，这种棉花的纤维更长更细腻，制作出来的面料不仅手感柔软如丝，而且透气性能极佳。我特意做过对比测试，将这件衣服和其他品牌的童装放在一起，无论是柔软度还是透气性，这款都明显胜出。更重要的是，这种纯棉面料经过了严格的安全检测，不含任何有害化学物质，完全符合婴幼儿纺织品安全标准，即使是最敏感的宝宝皮肤也能安心穿着。再来说说设计细节。荷叶领口的设计真的是这款上衣的点睛之笔，不仅增添了甜美可爱的气息，还能很好地修饰宝宝的脸型，让孩子看起来更加精神可爱。这个领口的制作工艺也很考究，采用了特殊的滚边技术，确保边缘平整不起毛，不会刮伤孩子娇嫩的皮肤。碎花图案的选择更是经过了精心设计，颜色搭配和谐自然，既有童真的味道，又不失时尚感，无论搭配什么下装都能展现出不同的风格。版型设计方面，这款上衣充分考虑了儿童的生长发育特点，采用宽松舒适的剪裁，既不会束缚孩子的活动，又能很好地展现出孩子的可爱身形。袖口和下摆的处理也很到位，松紧适中，既保证了穿着的舒适度，又能有效防止变形。在做工方面，每一个细节都体现出了匠心品质，走线平整，缝合牢固，经得起孩子日常的活动和多次洗涤。最后说说性价比，这样高品质的童装，价格却非常亲民，真的是每个家庭都能承受的范围。我真心推荐给每一位关爱孩子的妈妈，相信你们的宝贝穿上这款上衣，一定会更加可爱迷人！',
            '各位宝妈们，今天我要跟大家分享一个真正的好物发现！这款儿童纯棉碎花上衣绝对是我今年买过最满意的童装之一。作为一个对孩子穿着要求极高的妈妈，我在选择童装时总是格外谨慎，不仅要考虑美观，更要注重安全和舒适。这款上衣在各个方面都让我非常满意，今天就来详细给大家介绍一下。首先是面料品质，这款上衣使用的是精选优质纯棉，我专门了解过这个品牌的供应链，他们的棉花都来自于世界知名的优质产区，经过严格的筛选和处理。这种纯棉面料的特点是纤维长度适中，柔软度极高，同时具有优异的吸湿透气性能。我做过实际测试，在同样的环境下，孩子穿这件衣服比穿其他品牌的衣服明显感觉更加干爽舒适。而且这种面料经过了多重安全检测，完全符合国际婴幼儿纺织品安全标准，不含甲醛、重金属等有害物质，家长们可以完全放心。设计方面，荷叶领口的创意真的让人眼前一亮。这个设计不仅仅是为了美观，更多的是考虑到了实用性。荷叶边的设计能够很好地修饰孩子的脸型，让宝宝看起来更加精神可爱。同时，这个领口的开合设计也很人性化，既方便穿脱，又不会过于宽松导致走光。碎花图案的选择更是体现了设计师的用心，采用了清新自然的色彩搭配，既符合儿童活泼可爱的天性，又不会过于花哨显得俗气。这种图案的搭配性很强，无论是配牛仔裤、休闲裤还是小裙子都能展现出不同的风格。在版型设计上，这款上衣充分考虑了儿童的身体特点和活动需求。采用了适度宽松的剪裁，既保证了穿着的舒适度，又不会显得过于臃肿。袖子的长度设计得恰到好处，既能保护孩子的手臂，又不会影响日常活动。下摆的设计也很贴心，长度适中，既能很好地搭配各种下装，又能保证孩子在活动时不会走光。做工品质方面，这款上衣的每一个细节都体现出了精工细作的品质。所有的缝线都非常平整牢固，经得起孩子日常的各种活动。特别是容易磨损的部位，如领口、袖口等地方，都做了特殊的加固处理，大大延长了衣服的使用寿命。最让我满意的是这款上衣的性价比，如此高品质的童装，价格却非常合理，真正做到了物超所值。我已经为我家宝宝购买了多件不同颜色的，准备作为日常的主要搭配。强烈推荐给所有注重品质的宝妈们！'
        ]
    };
    
    return templates[wordCountRange] || templates['50-75'];
}
