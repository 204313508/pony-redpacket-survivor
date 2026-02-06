// ==================== 游戏配置和常量 ====================
const CONFIG = {
    // 地图配置
    MAP_WIDTH: 1600,
    MAP_HEIGHT: 1000,
    
    // 移动端适配配置
    MOBILE: {
        SPEED_MULTIPLIER: 0.45, // 移动端速度系数（降低以便更精确控制）
        ATTACK_RANGE_MULTIPLIER: 1.1, // 移动端攻击范围系数
        COLLECT_RANGE_MULTIPLIER: 1.3, // 移动端收集范围系数（确保收集范围比攻击范围大）
        CAMERA_ZOOM: 0.7, // 移动端摄像机缩放（小于1表示缩小视野，让玩家看到更大区域）
        REDPACKET_COLLECT_SPEED_MULTIPLIER: 0.6 // 移动端红包收集速度系数
    },

    // 玩家初始属性
    PLAYER: {
        INITIAL_HP: 100,
        INITIAL_ATTACK: 15,
        INITIAL_DEFENSE: 5,
        INITIAL_SPEED: 4,
        INITIAL_LEVEL: 1,
        INITIAL_EXP: 0,
        INITIAL_EXP_TO_LEVEL: 100,
        SIZE: 30,
        ATTACK_RANGE: 160,
        ATTACK_COOLDOWN: 400
    },

    // 红包配置
    REDPACKET: {
        SIZE: 15,
        COLLECT_RANGE: 225,
        COLLECT_SPEED: 10,
        EXP_VALUE: 10
    },
    
    // 怪物配置
    MONSTER: {
        INITIAL_HP: 30,
        INITIAL_ATTACK: 10,
        INITIAL_SPEED: 1.8,
        INITIAL_SIZE: 25,
        SPAWN_INTERVAL: 1500,
        MAX_MONSTERS: 30
    },

    // Boss配置
    BOSS: {
        INITIAL_HP: 200,
        ATTACK: 20,
        SPEED: 2.2,
        SIZE: 60,
        SPAWN_INTERVAL: 30000,
        EXPLOSION_DAMAGE: 30,
        REDPACKET_DROP_COUNT: 15
    },

    // 升级奖励
    UPGRADE: {
        HP_BONUS: 20,
        ATTACK_BONUS: 5,
        DEFENSE_BONUS: 3,
        SPEED_BONUS: 0.5,
        EXP_MULTIPLIER: 1.3
    }
};

// ==================== 游戏状态枚举 ====================
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// ==================== 工具函数 ====================
const Utils = {
    // 计算两点距离
    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },
    
    // 限制数值范围
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    // 随机范围数
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // 向量归一化
    normalize(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return { x: x / length, y: y / length };
    }
};

// ==================== 虚拟摇杆类 ====================
class VirtualJoystick {
    constructor(container) {
        this.container = container;
        this.base = container.querySelector('.joystick-base');
        this.stick = container.querySelector('.joystick-stick');
        
        this.active = false;
        this.touchId = null;
        this.baseCenter = { x: 0, y: 0 };
        this.stickPosition = { x: 0, y: 0 };
        this.input = { x: 0, y: 0 };
        
        this.maxDistance = 40; // 摇杆最大移动距离
        this.deadZone = 0.1; // 死区，避免轻微抖动
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        this.container.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.changedTouches[0];
        this.touchId = touch.identifier;
        this.active = true;
        
        const rect = this.base.getBoundingClientRect();
        this.baseCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        
        this.updateStickPosition(touch.clientX, touch.clientY);
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.active) return;
        
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === this.touchId) {
                this.updateStickPosition(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                break;
            }
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === this.touchId) {
                this.reset();
                break;
            }
        }
    }
    
    updateStickPosition(touchX, touchY) {
        const dx = touchX - this.baseCenter.x;
        const dy = touchY - this.baseCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 限制摇杆移动范围
        const clampedDistance = Math.min(distance, this.maxDistance);
        const normalized = Utils.normalize(dx, dy);
        
        this.stickPosition = {
            x: normalized.x * clampedDistance,
            y: normalized.y * clampedDistance
        };
        
        // 计算输入值（归一化到 -1 到 1 之间）
        let inputX = normalized.x * (clampedDistance / this.maxDistance);
        let inputY = normalized.y * (clampedDistance / this.maxDistance);
        
        // 应用死区，避免轻微抖动
        const inputMagnitude = Math.sqrt(inputX * inputX + inputY * inputY);
        if (inputMagnitude < this.deadZone) {
            inputX = 0;
            inputY = 0;
        } else {
            // 调整输出，使死区之外的输入更平滑
            const adjustedMagnitude = (inputMagnitude - this.deadZone) / (1 - this.deadZone);
            inputX = (inputX / inputMagnitude) * adjustedMagnitude;
            inputY = (inputY / inputMagnitude) * adjustedMagnitude;
        }
        
        this.input = {
            x: inputX,
            y: inputY
        };
        
        // 更新摇杆视觉位置
        this.stick.style.transform = `translate(calc(-50% + ${this.stickPosition.x}px), calc(-50% + ${this.stickPosition.y}px))`;
    }
    
    reset() {
        this.active = false;
        this.touchId = null;
        this.stickPosition = { x: 0, y: 0 };
        this.input = { x: 0, y: 0 };
        this.stick.style.transform = 'translate(-50%, -50%)';
    }
    
    getInput() {
        return this.input;
    }
}

// ==================== 音效系统 ====================
class SoundEffect {
    constructor() {
        this.sounds = {};
        this.loaded = false;
        this.volume = 0.5;
    }

    init() {
        if (this.loaded) return;

        // 加载音效文件
        this.sounds = {
            attack: new Audio('sounds/attack.mp3'),
            monsterDeath: new Audio('sounds/monster_death.mp3'),
            collect: new Audio('sounds/collect.mp3'),
            upgrade: new Audio('sounds/upgrade.mp3')
        };

        // 设置音量
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
            sound.load();
        });

        this.loaded = true;
    }

    playAttack() {
        if (!this.loaded) this.init();
        if (this.sounds.attack) {
            const sound = this.sounds.attack.cloneNode();
            sound.volume = this.volume;
            sound.play().catch(e => console.log('音效播放失败:', e));
        }
    }

    playMonsterDeath() {
        if (!this.loaded) this.init();
        if (this.sounds.monsterDeath) {
            const sound = this.sounds.monsterDeath.cloneNode();
            sound.volume = this.volume;
            sound.play().catch(e => console.log('音效播放失败:', e));
        }
    }

    playCollect() {
        if (!this.loaded) this.init();
        if (this.sounds.collect) {
            const sound = this.sounds.collect.cloneNode();
            sound.volume = this.volume;
            sound.play().catch(e => console.log('音效播放失败:', e));
        }
    }

    playUpgrade() {
        if (!this.loaded) this.init();
        if (this.sounds.upgrade) {
            const sound = this.sounds.upgrade.cloneNode();
            sound.volume = this.volume;
            sound.play().catch(e => console.log('音效播放失败:', e));
        }
    }
}

// ==================== 玩家类 ====================
class Player {
    constructor(x, y, isMobile = false) {
        this.x = x;
        this.y = y;
        this.hp = CONFIG.PLAYER.INITIAL_HP;
        this.maxHp = CONFIG.PLAYER.INITIAL_HP;
        this.attackPower = CONFIG.PLAYER.INITIAL_ATTACK;
        this.defense = CONFIG.PLAYER.INITIAL_DEFENSE;
        this.isMobile = isMobile;
        
        // 移动端使用较低的速度
        this.baseSpeed = CONFIG.PLAYER.INITIAL_SPEED;
        if (this.isMobile) {
            this.baseSpeed = CONFIG.PLAYER.INITIAL_SPEED * CONFIG.MOBILE.SPEED_MULTIPLIER;
        }
        this.speed = this.baseSpeed;
        
        this.level = CONFIG.PLAYER.INITIAL_LEVEL;
        this.exp = CONFIG.PLAYER.INITIAL_EXP;
        this.expToLevel = CONFIG.PLAYER.INITIAL_EXP_TO_LEVEL;
        this.size = CONFIG.PLAYER.SIZE;
        
        // 移动端使用稍大的攻击范围
        this.attackRange = CONFIG.PLAYER.ATTACK_RANGE;
        if (this.isMobile) {
            this.attackRange = CONFIG.PLAYER.ATTACK_RANGE * CONFIG.MOBILE.ATTACK_RANGE_MULTIPLIER;
        }
        
        this.attackCooldown = 0;
        this.lastAttackTime = 0;
        this.direction = 1; // 1为右，-1为左
        this.isMoving = false;

        // 攻击动画相关
        this.isAttacking = false;
        this.attackAnimationTime = 0;
        this.attackAnimationDuration = 200;

        // 受伤动画相关
        this.isHurt = false;
        this.hurtAnimationTime = 0;
        this.hurtAnimationDuration = 400;
    }
    
    update(deltaTime, keys, joystickInput = { x: 0, y: 0 }) {
        // 移动处理
        let dx = 0;
        let dy = 0;
        
        // 键盘输入
        if (keys['ArrowUp'] || keys['KeyW']) dy -= 1;
        if (keys['ArrowDown'] || keys['KeyS']) dy += 1;
        if (keys['ArrowLeft'] || keys['KeyA']) {
            dx -= 1;
            this.direction = -1;
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
            dx += 1;
            this.direction = 1;
        }
        
        // 虚拟摇杆输入（如果没有键盘输入，则使用摇杆输入）
        if (dx === 0 && dy === 0 && (joystickInput.x !== 0 || joystickInput.y !== 0)) {
            dx = joystickInput.x;
            dy = joystickInput.y;
            
            // 根据摇杆方向设置朝向
            if (dx > 0) this.direction = 1;
            else if (dx < 0) this.direction = -1;
        }
        
        // 归一化对角线移动
        if (dx !== 0 && dy !== 0) {
            const normalized = Utils.normalize(dx, dy);
            dx = normalized.x;
            dy = normalized.y;
        }
        
        this.x += dx * this.speed;
        this.y += dy * this.speed;
        
        // 边界限制
        this.x = Utils.clamp(this.x, this.size, CONFIG.MAP_WIDTH - this.size);
        this.y = Utils.clamp(this.y, this.size, CONFIG.MAP_HEIGHT - this.size);
        
        this.isMoving = dx !== 0 || dy !== 0;

        // 攻击冷却更新
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        // 攻击动画更新
        if (this.isAttacking) {
            this.attackAnimationTime += deltaTime;
            if (this.attackAnimationTime >= this.attackAnimationDuration) {
                this.isAttacking = false;
            }
        }

        // 受伤动画更新
        if (this.isHurt) {
            this.hurtAnimationTime += deltaTime;
            if (this.hurtAnimationTime >= this.hurtAnimationDuration) {
                this.isHurt = false;
            }
        }
    }
    
    canAttack() {
        return this.attackCooldown <= 0;
    }
    
    attack() {
        if (this.canAttack()) {
            this.attackCooldown = CONFIG.PLAYER.ATTACK_COOLDOWN;
            this.isAttacking = true;
            this.attackAnimationTime = 0;
            return true;
        }
        return false;
    }
    
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - this.defense);
        this.hp -= actualDamage;

        // 触发受伤动画
        this.isHurt = true;
        this.hurtAnimationTime = 0;

        return actualDamage;
    }
    
    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.expToLevel) {
            return true; // 可以升级
        }
        return false;
    }
    
    levelUp() {
        this.level++;
        this.exp = this.exp - this.expToLevel;
        this.expToLevel = Math.floor(this.expToLevel * CONFIG.UPGRADE.EXP_MULTIPLIER);
    }
    
    upgrade(type) {
        switch(type) {
            case 'health':
                this.maxHp += CONFIG.UPGRADE.HP_BONUS;
                this.hp = Math.min(this.maxHp, this.hp + 20);
                break;
            case 'attack':
                this.attackPower += CONFIG.UPGRADE.ATTACK_BONUS;
                break;
            case 'defense':
                this.defense += CONFIG.UPGRADE.DEFENSE_BONUS;
                break;
            case 'speed':
                // 升级速度时应用移动端系数
                const speedBonus = this.isMobile 
                    ? CONFIG.UPGRADE.SPEED_BONUS * CONFIG.MOBILE.SPEED_MULTIPLIER 
                    : CONFIG.UPGRADE.SPEED_BONUS;
                this.speed += speedBonus;
                break;
        }
    }
    
    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // 攻击动画计算
        let attackScale = 1;
        let attackGlow = false;
        let shakeY = 0;

        if (this.isAttacking) {
            const progress = this.attackAnimationTime / this.attackAnimationDuration;

            // 攻击时身体晃动
            shakeY = Math.sin(progress * Math.PI * 4) * 5;

            // 攻击时身体放大
            attackScale = 1 + Math.sin(progress * Math.PI) * 0.3;

            // 攻击时身体发光
            attackGlow = true;
        }

        // 受伤动画计算
        let hurtShakeX = 0;
        let hurtShakeY = 0;
        let hurtGlow = false;
        let hurtScale = 1;

        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;

            // 受伤时剧烈晃动
            hurtShakeX = Math.sin(progress * Math.PI * 12) * this.size * 0.2;
            hurtShakeY = Math.cos(progress * Math.PI * 12) * this.size * 0.2;

            // 受伤时缩放
            hurtScale = 1 + Math.sin(progress * Math.PI * 2) * 0.15;

            // 受伤时红色发光
            hurtGlow = true;
        }

        // 绘制小马（使用emoji）
        ctx.save();
        ctx.translate(screenX + hurtShakeX, screenY + shakeY + hurtShakeY);
        ctx.scale(this.direction * attackScale * hurtScale, attackScale * hurtScale);

        // 先绘制光环（在emoji后面）
        if (attackGlow) {
            const alpha = 1 - (this.attackAnimationTime / this.attackAnimationDuration);
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#FFD700';
            ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.stroke();

            // 第二层光环
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (hurtGlow) {
            const alpha = 1 - (this.hurtAnimationTime / this.hurtAnimationDuration);
            ctx.shadowBlur = 25;
            ctx.shadowColor = `rgba(255, 0, 0, ${alpha})`;
            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.6, 0, Math.PI * 2);
            ctx.stroke();

            // 内部红色光环
            ctx.strokeStyle = `rgba(255, 100, 100, ${alpha * 0.6})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制小马emoji
        ctx.font = `${this.size * 2.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐴', 0, 0);

        ctx.restore();

        // 攻击范围指示器（根据设置决定是否显示）
        const shouldShowAttackRange = (this.isMoving || this.isAttacking) && 
                                       (!window.gameSettings || window.gameSettings.showAttackRange);
        
        if (shouldShowAttackRange) {
            const rangeAlpha = this.isAttacking ? 0.9 : 0.6;
            const rangeLineWidth = this.isAttacking ? 4 : 2;

            ctx.save();
            
            // 单一圆环 - 金色（不放大，确保与实际攻击范围一致）
            ctx.strokeStyle = `rgba(255, 215, 0, ${rangeAlpha})`;
            ctx.lineWidth = rangeLineWidth;
            ctx.shadowBlur = this.isAttacking ? 20 : 10;
            ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.attackRange, 0, Math.PI * 2);
            ctx.stroke();
            
            // 攻击时内部填充效果（不放大）
            if (this.isAttacking) {
                const fillAlpha = 0.15 * (1 - this.attackAnimationTime / this.attackAnimationDuration);
                ctx.fillStyle = `rgba(255, 215, 0, ${fillAlpha})`;
                ctx.fill();
            }
            
            ctx.restore();
        }

        // 红包收集范围指示器（根据设置决定是否显示）
        // 移动端使用专门的收集范围系数
        const collectRange = this.isMobile
            ? CONFIG.REDPACKET.COLLECT_RANGE * CONFIG.MOBILE.COLLECT_RANGE_MULTIPLIER
            : CONFIG.REDPACKET.COLLECT_RANGE;
        
        // 检查是否显示收集范围（通过全局设置）
        if (window.gameSettings && window.gameSettings.showCollectRange) {
            const collectAlpha = 0.4;
            
            ctx.save();
            
            // 单一圆环 - 绿色
            ctx.strokeStyle = `rgba(46, 213, 115, ${collectAlpha})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(46, 213, 115, 0.5)';
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.arc(screenX, screenY, collectRange, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        }

        // 移动时的脚印效果
        if (this.isMoving && !this.isAttacking) {
            const time = Date.now() / 200;
            const footOffset = Math.sin(time) * 3;

            ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
            ctx.beginPath();
            ctx.ellipse(screenX - 15, screenY + this.size + footOffset, 8, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(screenX + 15, screenY + this.size - footOffset, 8, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 只绘制emoji，确保在所有特效层之上显示
    drawEmojiOnly(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // 攻击动画计算
        let attackScale = 1;
        let shakeY = 0;

        if (this.isAttacking) {
            const progress = this.attackAnimationTime / this.attackAnimationDuration;
            shakeY = Math.sin(progress * Math.PI * 4) * 5;
            attackScale = 1 + Math.sin(progress * Math.PI) * 0.3;
        }

        // 受伤动画计算
        let hurtShakeX = 0;
        let hurtShakeY = 0;
        let hurtScale = 1;

        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;
            hurtShakeX = Math.sin(progress * Math.PI * 12) * this.size * 0.2;
            hurtShakeY = Math.cos(progress * Math.PI * 12) * this.size * 0.2;
            hurtScale = 1 + Math.sin(progress * Math.PI * 2) * 0.15;
        }

        ctx.save();
        ctx.translate(screenX + hurtShakeX, screenY + shakeY + hurtShakeY);
        ctx.scale(this.direction * attackScale * hurtScale, attackScale * hurtScale);

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制小马emoji
        ctx.font = `${this.size * 2.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐴', 0, 0);

        ctx.restore();
    }
}

// ==================== 怪物类 ====================
class Monster {
    constructor(x, y, difficultyMultiplier) {
        this.x = x;
        this.y = y;
        
        // 获取游戏设置
        const settings = window.gameSettings || {};
        
        // 使用设置中的数值
        this.baseHp = settings.monsterInitialHP || CONFIG.MONSTER.INITIAL_HP;
        this.hp = Math.floor(this.baseHp * (1 + (difficultyMultiplier - 1) * (settings.monsterHPGrowth || 0.1) * 10));
        this.maxHp = this.hp;
        this.attack = Math.floor((settings.monsterInitialAttack || CONFIG.MONSTER.INITIAL_ATTACK) * (1 + (difficultyMultiplier - 1) * (settings.monsterAttackGrowth || 0.05) * 10));
        this.speed = (settings.monsterInitialSpeed || CONFIG.MONSTER.INITIAL_SPEED) * (1 + (difficultyMultiplier - 1) * (settings.monsterSpeedGrowth || 0.02) * 10);
        this.size = (settings.monsterInitialSize || CONFIG.MONSTER.INITIAL_SIZE) + (difficultyMultiplier - 1) * 2;
        this.damage = this.attack;
        this.expValue = Math.floor((settings.monsterExpValue || CONFIG.REDPACKET.EXP_VALUE) * difficultyMultiplier);
        
        // 受伤动画相关
        this.isHurt = false;
        this.hurtAnimationTime = 0;
        this.hurtAnimationDuration = 300;
    }
    
    update(player) {
        // 简单的追踪AI
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const normalized = Utils.normalize(dx, dy);
            this.x += normalized.x * this.speed;
            this.y += normalized.y * this.speed;
        }
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        
        // 触发受伤动画
        if (this.hp > 0) {
            this.isHurt = true;
            this.hurtAnimationTime = 0;
        }
        
        return this.hp <= 0;
    }
    
    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;
        
        // 受伤动画效果
        let scale = 1;
        let shakeX = 0;
        let shakeY = 0;
        
        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;
            
            // 受伤时晃动
            shakeX = Math.sin(progress * Math.PI * 12) * this.size * 0.2;
            shakeY = Math.cos(progress * Math.PI * 12) * this.size * 0.2;
            
            // 更新动画时间
            this.hurtAnimationTime += 16;
            if (this.hurtAnimationTime >= this.hurtAnimationDuration) {
                this.isHurt = false;
            }
        }
        
        // 绘制怪物的光环（始终存在）
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);

        // 怪物周围的光环（使用stroke而不是fill，避免遮挡emoji）
        const auraAlpha = 0.3 + Math.sin(Date.now() * 0.003) * 0.1;
        ctx.strokeStyle = `rgba(245, 87, 108, ${auraAlpha * 0.5})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
        ctx.stroke();

        // 受伤时的发光效果
        if (this.isHurt) {
            const alpha = 1 - (this.hurtAnimationTime / this.hurtAnimationDuration);
            ctx.shadowBlur = 30;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;

            // 受伤时的白色光环
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.0, 0, Math.PI * 2);
            ctx.stroke();

            // 第二层光环
            ctx.strokeStyle = `rgba(245, 87, 108, ${alpha * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制红包emoji
        ctx.font = `${this.size * 1.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);

        ctx.restore();
        
        // 绘制血条（在restore之后，确保血条不受translate影响）
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        
        const healthPercent = this.hp / this.maxHp;
        const barWidth = this.size * 1.4;
        const barHeight = 8;
        const barY = -this.size * 1.0;
        
        // 血条背景
        const barBgGradient = ctx.createLinearGradient(-barWidth / 2, 0, barWidth / 2, 0);
        barBgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        barBgGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
        barBgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        ctx.fillStyle = barBgGradient;
        ctx.beginPath();
        ctx.roundRect(-barWidth / 2, barY, barWidth, barHeight, 4);
        ctx.fill();
        
        // 血条边框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 血条填充（渐变色）
        const barColor = healthPercent > 0.5 ? '#2ed573' : healthPercent > 0.25 ? '#ffa502' : '#ff4757';
        const fillGradient = ctx.createLinearGradient(-barWidth / 2, 0, barWidth / 2, 0);
        fillGradient.addColorStop(0, barColor);
        fillGradient.addColorStop(1, healthPercent > 0.5 ? '#7bed9f' : healthPercent > 0.25 ? '#ffbe76' : '#ff6b81');
        
        ctx.fillStyle = fillGradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = barColor;
        ctx.beginPath();
        ctx.roundRect(-barWidth / 2 + 2, barY + 2, (barWidth - 4) * healthPercent, barHeight - 4, 2);
        ctx.fill();

        ctx.restore();
    }

    // 只绘制emoji，确保在所有特效层之上显示
    drawEmojiOnly(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // 受伤动画效果
        let shakeX = 0;
        let shakeY = 0;

        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;
            shakeX = Math.sin(progress * Math.PI * 12) * this.size * 0.2;
            shakeY = Math.cos(progress * Math.PI * 12) * this.size * 0.2;
        }

        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制红包emoji
        ctx.font = `${this.size * 1.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);

        ctx.restore();
    }
}

// ==================== Boss类 ====================
class Boss {
    constructor(x, y, difficultyMultiplier) {
        this.x = x;
        this.y = y;
        
        // 获取游戏设置
        const settings = window.gameSettings || {};
        
        // 使用设置中的数值
        this.hp = Math.floor((settings.bossInitialHP || CONFIG.BOSS.INITIAL_HP) * (1 + (difficultyMultiplier - 1) * (settings.bossHPGrowth || 0.15) * 10));
        this.maxHp = this.hp;
        this.attack = Math.floor((settings.bossAttack || CONFIG.BOSS.ATTACK) * (1 + (difficultyMultiplier - 1) * (settings.bossAttackGrowth || 0.08) * 10));
        this.speed = (settings.bossSpeed || CONFIG.BOSS.SPEED) * (1 + (difficultyMultiplier - 1) * (settings.bossSpeedGrowth || 0.03) * 10);
        this.size = settings.bossSize || CONFIG.BOSS.SIZE;
        this.damage = this.attack;
        this.explosionDamage = settings.bossExplosionDamage || CONFIG.BOSS.EXPLOSION_DAMAGE;
        this.redpacketDropCount = settings.bossRedpacketDropCount || CONFIG.BOSS.REDPACKET_DROP_COUNT;

        // 受伤动画相关
        this.isHurt = false;
        this.hurtAnimationTime = 0;
        this.hurtAnimationDuration = 300;

        // 自爆冷却
        this.canExplode = true;
        this.explodeCooldown = 1500;
        this.lastExplodeTime = 0;

        // Boss名称
        this.name = '🧧 BOSS';
    }

    update(deltaTime, player) {
        // 追踪玩家
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const normalized = Utils.normalize(dx, dy);
            this.x += normalized.x * this.speed;
            this.y += normalized.y * this.speed;
        }

        // 更新自爆冷却
        if (!this.canExplode) {
            if (Date.now() - this.lastExplodeTime >= this.explodeCooldown) {
                this.canExplode = true;
            }
        }

        // 更新受伤动画
        if (this.isHurt) {
            this.hurtAnimationTime += deltaTime;
            if (this.hurtAnimationTime >= this.hurtAnimationDuration) {
                this.isHurt = false;
            }
        }
    }

    takeDamage(damage) {
        this.hp -= damage;

        // 触发受伤动画
        if (this.hp > 0) {
            this.isHurt = true;
            this.hurtAnimationTime = 0;
        }

        return this.hp <= 0;
    }

    explode() {
        if (!this.canExplode) return null;

        // 自爆扣血
        this.hp -= this.explosionDamage;
        this.lastExplodeTime = Date.now();
        this.canExplode = false;

        // 触发受伤动画
        this.isHurt = true;
        this.hurtAnimationTime = 0;

        // 返回是否死亡
        return {
            dead: this.hp <= 0,
            damage: this.explosionDamage
        };
    }

    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // 受伤动画效果
        let scale = 1;
        let shakeX = 0;
        let shakeY = 0;

        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;

            // 受伤时剧烈晃动
            shakeX = Math.sin(progress * Math.PI * 15) * this.size * 0.15;
            shakeY = Math.cos(progress * Math.PI * 15) * this.size * 0.15;
        }

        // Boss呼吸动画
        const breatheScale = 1 + Math.sin(Date.now() / 400) * 0.08;

        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        ctx.scale(scale * breatheScale, scale * breatheScale);

        // 绘制Boss光环（多层）
        const time = Date.now();
        const auraPulse = 0.15 + Math.sin(time * 0.002) * 0.05;

        // 第一层光环（最外层，红色描边）
        ctx.strokeStyle = `rgba(255, 102, 0, ${auraPulse * 0.6})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.6, 0, Math.PI * 2);
        ctx.stroke();

        // 第二层光环（橙色描边）
        ctx.strokeStyle = `rgba(255, 165, 0, ${auraPulse * 0.5})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
        ctx.stroke();

        // 第三层光环（金色，内层）
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.6 + Math.sin(time * 0.003) * 0.2})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.1, 0, Math.PI * 2);
        ctx.stroke();

        // 受伤时的额外发光效果
        if (this.isHurt) {
            const alpha = 1 - (this.hurtAnimationTime / this.hurtAnimationDuration);
            ctx.shadowBlur = 40;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;

            // 受伤时的白色光环
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
            ctx.stroke();

            // 闪烁效果（改为描边，避免填充遮挡emoji）
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        } else {
            // 正常状态下的发光
            ctx.shadowBlur = 35;
            ctx.shadowColor = 'rgba(255, 102, 0, 0.6)';
        }

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制Boss（大红包）
        ctx.font = `${this.size * 1.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);

        // 绘制Boss名称标签
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('BOSS', 0, -this.size * 0.7);
        
        // 添加警告标志
        ctx.font = '12px Arial';
        ctx.fillStyle = '#ff4757';
        ctx.fillText('⚠', 0, -this.size * 0.9);

        ctx.restore();

        // 绘制Boss血条（在restore之后）
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);

        const healthPercent = this.hp / this.maxHp;
        const barWidth = this.size * 2.2;
        const barHeight = 12;
        const barY = -this.size * 1.4;

        // 血条背景（渐变）
        const barBgGradient = ctx.createLinearGradient(-barWidth / 2, 0, barWidth / 2, 0);
        barBgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
        barBgGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.7)');
        barBgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        ctx.fillStyle = barBgGradient;
        ctx.beginPath();
        ctx.roundRect(-barWidth / 2, barY, barWidth, barHeight, 6);
        ctx.fill();

        // 血条边框
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
        ctx.stroke();

        // 血条填充（渐变色）
        let barColor = '#2ed573';
        let barColorEnd = '#7bed9f';
        if (healthPercent <= 0.25) {
            barColor = '#ff4757';
            barColorEnd = '#ff6b81';
        } else if (healthPercent <= 0.5) {
            barColor = '#ffa502';
            barColorEnd = '#ffbe76';
        }
        
        const fillGradient = ctx.createLinearGradient(-barWidth / 2, 0, barWidth / 2, 0);
        fillGradient.addColorStop(0, barColor);
        fillGradient.addColorStop(1, barColorEnd);
        
        ctx.fillStyle = fillGradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = barColor;
        ctx.beginPath();
        ctx.roundRect(-barWidth / 2 + 3, barY + 3, (barWidth - 6) * healthPercent, barHeight - 6, 4);
        ctx.fill();

        // 血量文本
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.ceil(this.hp)}/${this.maxHp}`, 0, barY - 8);

        ctx.restore();
    }

    // 只绘制emoji，确保在所有特效层之上显示
    drawEmojiOnly(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // 受伤动画效果
        let shakeX = 0;
        let shakeY = 0;

        if (this.isHurt) {
            const progress = this.hurtAnimationTime / this.hurtAnimationDuration;
            shakeX = Math.sin(progress * Math.PI * 15) * this.size * 0.15;
            shakeY = Math.cos(progress * Math.PI * 15) * this.size * 0.15;
        }

        // Boss呼吸动画
        const breatheScale = 1 + Math.sin(Date.now() / 400) * 0.08;

        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        ctx.scale(breatheScale, breatheScale);

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制Boss（大红包）
        ctx.font = `${this.size * 1.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);

        // 绘制Boss名称标签
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('BOSS', 0, -this.size * 0.7);

        // 添加警告标志
        ctx.font = '12px Arial';
        ctx.fillStyle = '#ff4757';
        ctx.fillText('⚠', 0, -this.size * 0.9);

        ctx.restore();
    }
}

// ==================== 红包掉落类 ====================
class RedPacket {
    constructor(x, y, isMobile = false) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.REDPACKET.SIZE;
        
        // 获取游戏设置
        const settings = window.gameSettings || {};
        this.expValue = settings.redpacketExpValue || CONFIG.REDPACKET.EXP_VALUE;
        
        this.velocity = { x: 0, y: 0 };
        this.isBeingCollected = false;
        this.collectedByPlayer = false;
        this.bobAngle = Math.random() * Math.PI * 2;
        this.isMobile = isMobile;
    }
    
    update(deltaTime, player) {
        // 浮动效果
        this.bobAngle += deltaTime * 0.005;
        
        const distance = Utils.distance(this.x, this.y, player.x, player.y);
        
        // 收集检测（根据玩家是否为移动端调整收集范围）
        const collectRange = player.isMobile
            ? CONFIG.REDPACKET.COLLECT_RANGE * CONFIG.MOBILE.COLLECT_RANGE_MULTIPLIER
            : CONFIG.REDPACKET.COLLECT_RANGE;
        
        if (distance < collectRange) {
            this.isBeingCollected = true;
            this.collectedByPlayer = true;
            
            // 飞向玩家
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const normalized = Utils.normalize(dx, dy);
            
            // 移动端使用较慢的收集速度
            const collectSpeed = this.isMobile 
                ? CONFIG.REDPACKET.COLLECT_SPEED * CONFIG.MOBILE.REDPACKET_COLLECT_SPEED_MULTIPLIER
                : CONFIG.REDPACKET.COLLECT_SPEED;
            
            this.x += normalized.x * collectSpeed;
            this.y += normalized.y * collectSpeed;
        }
        
        return distance < player.size + this.size;
    }
    
    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY + Math.sin(this.bobAngle) * 5;
        
        ctx.save();
        ctx.translate(screenX, screenY);

        // 外围光环（在emoji后面）
        ctx.strokeStyle = `rgba(255, 215, 0, 0.5)`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.stroke();

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制红包emoji（使用💰）
        ctx.font = `${this.size * 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💰', 0, 0);

        ctx.restore();
    }

    // 只绘制emoji，确保在所有特效层之上显示
    drawEmojiOnly(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY + Math.sin(this.bobAngle) * 5;

        ctx.save();
        ctx.translate(screenX, screenY);

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制红包emoji
        ctx.font = `${this.size * 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💰', 0, 0);

        ctx.restore();
    }
}

// ==================== 攻击效果类 ====================
class AttackEffect {
    constructor(x, y, direction, attackRange) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.radius = 0;
        this.maxRadius = attackRange;
        this.duration = 300;
        this.elapsed = 0;
        this.active = true;
    }
    
    update(deltaTime) {
        this.elapsed += deltaTime;
        this.radius = (this.elapsed / this.duration) * this.maxRadius;
        
        if (this.elapsed >= this.duration) {
            this.active = false;
        }
    }
    
    draw(ctx, cameraX, cameraY) {
        if (!this.active) return;
        
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;
        
        const alpha = 1 - (this.elapsed / this.duration);
        const progress = this.elapsed / this.duration;
        
        // 保存上下文
        ctx.save();
        
        // 第一层：金色外圈波纹（最明显）
        ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.lineWidth = 5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(255, 215, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // 第二层：内圈白色波纹
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        
        // 第三层：内圈橙色波纹
        ctx.strokeStyle = `rgba(255, 140, 0, ${alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius * 0.4, 0, Math.PI * 2);
        ctx.stroke();
        
        // 内部填充渐变
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.radius);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${alpha * 0.5})`);
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 140, 0, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // 中心爆炸效果
        if (progress < 0.3) {
            const explosionAlpha = 1 - (progress / 0.3);
            ctx.fillStyle = `rgba(255, 255, 255, ${explosionAlpha})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.radius * 0.3 * (1 - progress / 0.3), 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// ==================== 怪物自爆特效类 ====================
class MonsterExplosionEffect {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.particles = [];
        this.duration = 500;
        this.elapsed = 0;
        this.active = true;

        // 创建爆炸粒子
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const speed = Utils.randomRange(3, 8);
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Utils.randomRange(3, 8),
                life: 1,
                color: Math.random() > 0.5 ? '#ff4444' : '#ffaa00'
            });
        }
    }

    update(deltaTime) {
        this.elapsed += deltaTime;

        // 更新粒子
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.life -= deltaTime / this.duration;
        });

        if (this.elapsed >= this.duration) {
            this.active = false;
        }
    }

    draw(ctx, cameraX, cameraY) {
        if (!this.active) return;

        const progress = this.elapsed / this.duration;
        const alpha = 1 - progress;

        ctx.save();

        // 绘制爆炸中心
        const centerX = this.x - cameraX;
        const centerY = this.y - cameraY;
        const centerSize = this.size * (1 + progress * 2);

        // 爆炸中心光晕
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerSize);
        gradient.addColorStop(0, `rgba(255, 200, 0, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerSize, 0, Math.PI * 2);
        ctx.fill();

        // 绘制粒子
        this.particles.forEach(particle => {
            if (particle.life > 0) {
                const px = particle.x - cameraX;
                const py = particle.y - cameraY;

                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.life * alpha;
                ctx.beginPath();
                ctx.arc(px, py, particle.size * particle.life, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // 爆炸冲击波
        const waveRadius = centerSize * (1 + progress * 3);
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = `rgba(255, 100, 0, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
}

// ==================== 小马受伤特效类 ====================
class PlayerHurtEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.duration = 300;
        this.elapsed = 0;
        this.active = true;
        this.shakeIntensity = 15;
    }

    update(deltaTime) {
        this.elapsed += deltaTime;
        if (this.elapsed >= this.duration) {
            this.active = false;
        }
    }

    draw(ctx, cameraX, cameraY) {
        if (!this.active) return;

        const progress = this.elapsed / this.duration;
        const alpha = 1 - progress;
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        ctx.save();

        // 红色闪光
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(screenX - 50, screenY - 50, 100, 100);

        // 红色波纹
        const waveRadius = 30 + progress * 70;
        ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(255, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 内层红色波纹
        const innerRadius = waveRadius * 0.6;
        ctx.strokeStyle = `rgba(255, 100, 100, ${alpha * 0.7})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(screenX, screenY, innerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 中心红色光晕
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 40);
        gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, 40, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.state = GameState.MENU;
        this.keys = {};
        this.mouse = { x: 0, y: 0 };

        this.player = null;
        this.monsters = [];
        this.bosses = [];
        this.redPackets = [];
        this.attackEffects = [];
        this.monsterExplosionEffects = [];
        this.playerHurtEffects = [];

        this.score = 0;
        this.totalRedPackets = 0;
        this.totalKills = 0;
        this.gameTime = 0;
        this.lastSpawnTime = 0;
        this.lastBossSpawnTime = 0;
        this.difficultyMultiplier = 1;

        // 音效系统
        this.soundEffect = new SoundEffect();

        // 移动端虚拟摇杆
        this.joystick = null;
        this.joystickInput = { x: 0, y: 0 };
        this.isTouchDevice = 'ontouchstart' in window;

        // 游戏设置
        this.defaultSettings = {
            // 视觉设置
            showAttackRange: true,
            showCollectRange: false,
            // 怪物基础数值
            monsterInitialHP: 30,
            monsterInitialAttack: 10,
            monsterInitialSpeed: 1.8,
            monsterInitialSize: 25,
            monsterMaxMonsters: 30,
            monsterSpawnInterval: 1500,
            // 怪物成长曲线
            monsterHPGrowth: 0.1,
            monsterAttackGrowth: 0.05,
            monsterSpeedGrowth: 0.02,
            // 怪物掉落经验
            monsterExpValue: 10,
            // Boss基础数值
            bossInitialHP: 200,
            bossAttack: 20,
            bossSpeed: 2.2,
            bossSize: 60,
            bossSpawnInterval: 30000,
            // Boss成长曲线
            bossHPGrowth: 0.15,
            bossAttackGrowth: 0.08,
            bossSpeedGrowth: 0.03,
            // Boss自爆伤害
            bossExplosionDamage: 30,
            // Boss掉落红包数量
            bossRedpacketDropCount: 15,
            // 红包掉落经验
            redpacketExpValue: 10
        };

        // 从localStorage加载设置，如果没有则使用默认设置
        this.settings = this.loadSettings();

        // 将设置暴露到全局，供Player.draw方法访问
        window.gameSettings = this.settings;

        // 初始状态下隐藏 HUD，显示开始界面
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('startScreen').classList.remove('hidden');

        this.setupEventListeners();

        // 渲染菜单背景
        this.renderMenuBackground();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        // 键盘事件
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            e.preventDefault();
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // 鼠标事件
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('click', (e) => {
            if (this.state === GameState.PLAYING) {
                this.handleAttack(e);
            }
        });
        
        // 按钮事件
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.showStartScreen());
        
        // 升级选项
        document.querySelectorAll('.upgrade-option').forEach(option => {
            option.addEventListener('click', () => {
                const upgradeType = option.dataset.upgrade;
                this.handleUpgrade(upgradeType);
            });
        });

        // 设置按钮事件
        document.getElementById('settingsButton').addEventListener('click', () => this.openSettings());

        // 关闭设置按钮事件
        document.getElementById('closeSettingsButton').addEventListener('click', () => this.closeSettings());

        // 重置设置按钮事件
        document.getElementById('resetSettingsButton').addEventListener('click', () => this.resetSettings());

        // 设置选项事件
        document.getElementById('showAttackRange').addEventListener('change', (e) => {
            this.settings.showAttackRange = e.target.checked;
        });

        document.getElementById('showCollectRange').addEventListener('change', (e) => {
            this.settings.showCollectRange = e.target.checked;
        });

        // 移动端攻击按钮事件
        const attackButton = document.getElementById('attackButton');
        attackButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.state === GameState.PLAYING) {
                this.executeAttack();
            }
        });
    }
    
    startGame() {
        this.player = new Player(CONFIG.MAP_WIDTH / 2, CONFIG.MAP_HEIGHT / 2, this.isTouchDevice);
        this.monsters = [];
        this.bosses = [];
        this.redPackets = [];
        this.attackEffects = [];
        this.monsterExplosionEffects = [];
        this.playerHurtEffects = [];

        this.score = 0;
        this.totalRedPackets = 0;
        this.totalKills = 0;
        this.gameTime = 0;
        this.lastSpawnTime = 0;
        this.lastBossSpawnTime = 0;
        this.difficultyMultiplier = 1;
        
        this.state = GameState.PLAYING;
        
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('upgradeScreen').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');

        // 初始化虚拟摇杆（如果是触摸设备）
        if (this.isTouchDevice) {
            const joystickElement = document.getElementById('joystick');
            joystickElement.classList.remove('hidden');
            if (!this.joystick) {
                this.joystick = new VirtualJoystick(joystickElement);
            }
            
            // 显示攻击按钮
            document.getElementById('attackButton').classList.remove('hidden');
        }
        
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    handleAttack(e) {
        this.executeAttack();
    }
    
    executeAttack() {
        if (!this.player || !this.player.attack()) return;

        // 播放攻击音效
        this.soundEffect.playAttack();

        // 创建攻击效果（使用玩家的实际攻击范围）
        this.attackEffects.push(new AttackEffect(this.player.x, this.player.y, this.player.direction, this.player.attackRange));

        // 检测攻击范围内的怪物
        const attackRadius = this.player.attackRange;

        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            const distance = Utils.distance(this.player.x, this.player.y, monster.x, monster.y);

            if (distance <= attackRadius) {
                const killed = monster.takeDamage(this.player.attackPower);

                if (killed) {
                    // 播放怪物死亡音效
                    this.soundEffect.playMonsterDeath();

                    // 怪物死亡，掉落红包
                    this.monsters.splice(i, 1);
                    this.redPackets.push(new RedPacket(monster.x, monster.y, this.isTouchDevice));
                    this.totalKills++;
                    this.score += 100;
                }
            }
        }

        // 检测攻击范围内的Boss
        for (let i = this.bosses.length - 1; i >= 0; i--) {
            const boss = this.bosses[i];
            const distance = Utils.distance(this.player.x, this.player.y, boss.x, boss.y);

            if (distance <= attackRadius) {
                const killed = boss.takeDamage(this.player.attackPower);

                if (killed) {
                    // 播放Boss死亡音效
                    this.soundEffect.playMonsterDeath();

                    // Boss死亡，掉落多个红包
                    for (let j = 0; j < boss.redpacketDropCount; j++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dropDistance = Utils.randomRange(30, 80);
                        const dropX = boss.x + Math.cos(angle) * dropDistance;
                        const dropY = boss.y + Math.sin(angle) * dropDistance;
                        this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                    }
                    this.bosses.splice(i, 1);
                    this.totalKills++;
                    this.score += 500;
                }
            }
        }

        this.updateUI();
    }
    
    handleUpgrade(upgradeType) {
        if (!this.player) return;

        this.player.upgrade(upgradeType);
        this.player.levelUp();

        document.getElementById('upgradeScreen').classList.add('hidden');
        this.state = GameState.PLAYING;

        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    spawnMonster(currentTime) {
        if (currentTime - this.lastSpawnTime > this.settings.monsterSpawnInterval / this.difficultyMultiplier) {
            if (this.monsters.length < this.settings.monsterMaxMonsters * this.difficultyMultiplier) {
                // 在玩家周围随机位置生成怪物
                const angle = Math.random() * Math.PI * 2;
                const distance = Utils.randomRange(200, 350);
                const x = this.player.x + Math.cos(angle) * distance;
                const y = this.player.y + Math.sin(angle) * distance;

                // 确保在地图范围内
                const clampedX = Utils.clamp(x, 50, CONFIG.MAP_WIDTH - 50);
                const clampedY = Utils.clamp(y, 50, CONFIG.MAP_HEIGHT - 50);

                this.monsters.push(new Monster(clampedX, clampedY, this.difficultyMultiplier));
            }

            this.lastSpawnTime = currentTime;
        }
    }
    
    updateDifficulty() {
        // 每30秒难度增加
        this.difficultyMultiplier = 1 + (this.gameTime / 30000) * 0.5;
    }

    spawnBoss(currentTime) {
        // 每30秒生成一个Boss
        if (currentTime - this.lastBossSpawnTime > this.settings.bossSpawnInterval) {
            // 在玩家较远的位置生成Boss
            const angle = Math.random() * Math.PI * 2;
            const distance = Utils.randomRange(400, 600);
            const x = this.player.x + Math.cos(angle) * distance;
            const y = this.player.y + Math.sin(angle) * distance;

            // 确保在地图范围内
            const clampedX = Utils.clamp(x, 50, CONFIG.MAP_WIDTH - 50);
            const clampedY = Utils.clamp(y, 50, CONFIG.MAP_HEIGHT - 50);

            this.bosses.push(new Boss(clampedX, clampedY, this.difficultyMultiplier));
            this.lastBossSpawnTime = currentTime;
        }
    }

    gameLoop() {
        if (this.state !== GameState.PLAYING) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.gameTime += deltaTime;
        
        // 更新难度
        this.updateDifficulty();
        
        // 生成怪物
        this.spawnMonster(currentTime);

        // 获取虚拟摇杆输入
        let joystickInput = { x: 0, y: 0 };
        if (this.joystick && this.joystick.active) {
            joystickInput = this.joystick.getInput();
        }

        // 更新玩家
        this.player.update(deltaTime, this.keys, joystickInput);

        // 更新怪物
        this.monsters.forEach(monster => monster.update(this.player));

        // 生成Boss
        this.spawnBoss(currentTime);

        // 更新Boss
        this.bosses.forEach(boss => boss.update(deltaTime, this.player));

        // Boss与玩家碰撞检测（Boss自爆）
        for (let i = this.bosses.length - 1; i >= 0; i--) {
            const boss = this.bosses[i];
            const distance = Utils.distance(this.player.x, this.player.y, boss.x, boss.y);

            if (distance < this.player.size + boss.size) {
                // Boss自爆
                const result = boss.explode();

                if (result) {
                    // 播放Boss自爆音效
                    this.soundEffect.playMonsterDeath();

                    // 创建Boss自爆特效
                    this.monsterExplosionEffects.push(new MonsterExplosionEffect(boss.x, boss.y, boss.size));

                    // 创建小马受伤特效
                    this.playerHurtEffects.push(new PlayerHurtEffect(this.player.x, this.player.y));

                    // 玩家受到伤害
                    this.player.takeDamage(result.damage);

                    // 如果Boss死亡，掉落红包
                    if (result.dead) {
                        // 掉落多个红包
                        for (let j = 0; j < boss.redpacketDropCount; j++) {
                            const angle = Math.random() * Math.PI * 2;
                            const dropDistance = Utils.randomRange(30, 80);
                            const dropX = boss.x + Math.cos(angle) * dropDistance;
                            const dropY = boss.y + Math.sin(angle) * dropDistance;
                            this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                        }
                        this.score += 500;
                        this.totalKills++;
                        this.bosses.splice(i, 1);
                    }

                    if (this.player.hp <= 0) {
                        this.gameOver();
                        return;
                    }
                } else {
                    // Boss在冷却期间，弹开玩家
                    const angle = Math.atan2(boss.y - this.player.y, boss.x - this.player.x);
                    const pushDistance = this.player.size + boss.size + 10;
                    this.player.x = boss.x - Math.cos(angle) * pushDistance;
                    this.player.y = boss.y - Math.sin(angle) * pushDistance;
                }
            }
        }

        // 怪物与玩家碰撞检测
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            const distance = Utils.distance(this.player.x, this.player.y, monster.x, monster.y);

            if (distance < this.player.size + monster.size) {
                const damage = this.player.takeDamage(monster.damage);

                // 播放怪物自爆音效
                this.soundEffect.playMonsterDeath();

                // 创建怪物自爆特效
                this.monsterExplosionEffects.push(new MonsterExplosionEffect(monster.x, monster.y, monster.size));

                // 创建小马受伤特效
                this.playerHurtEffects.push(new PlayerHurtEffect(this.player.x, this.player.y));

                this.monsters.splice(i, 1);

                if (this.player.hp <= 0) {
                    this.gameOver();
                    return;
                }
            }
        }
        
        // 更新红包
        for (let i = this.redPackets.length - 1; i >= 0; i--) {
            const redPacket = this.redPackets[i];
            const collected = redPacket.update(deltaTime, this.player);

            if (collected) {
                this.redPackets.splice(i, 1);
                this.totalRedPackets++;
                this.score += 50;

                // 播放收集音效
                this.soundEffect.playCollect();

                const canLevelUp = this.player.gainExp(redPacket.expValue);

                if (canLevelUp) {
                    // 播放升级音效
                    this.soundEffect.playUpgrade();
                    this.showUpgradeScreen();
                    return;
                }
            }
        }
        
        // 更新攻击效果
        for (let i = this.attackEffects.length - 1; i >= 0; i--) {
            const effect = this.attackEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.attackEffects.splice(i, 1);
            }
        }

        // 更新怪物自爆特效
        for (let i = this.monsterExplosionEffects.length - 1; i >= 0; i--) {
            const effect = this.monsterExplosionEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.monsterExplosionEffects.splice(i, 1);
            }
        }

        // 更新小马受伤特效
        for (let i = this.playerHurtEffects.length - 1; i >= 0; i--) {
            const effect = this.playerHurtEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.playerHurtEffects.splice(i, 1);
            }
        }

        // 更新UI
        this.updateUI();
        
        // 渲染
        this.render();
        
        // 继续循环
        requestAnimationFrame(() => this.gameLoop());
    }
    
    showUpgradeScreen() {
        this.state = GameState.PAUSED;
        document.getElementById('upgradeScreen').classList.remove('hidden');
        document.getElementById('currentLevel').textContent = this.player.level;
    }

    showStartScreen() {
        this.state = GameState.MENU;
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('startScreen').classList.remove('hidden');

        // 渲染菜单背景
        this.renderMenuBackground();
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('ponyRedpacketSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                // 合并保存的设置和默认设置（确保新设置项有默认值）
                return { ...this.defaultSettings, ...parsed };
            }
        } catch (e) {
            console.log('加载设置失败，使用默认设置:', e);
        }
        return { ...this.defaultSettings };
    }

    saveSettings() {
        try {
            localStorage.setItem('ponyRedpacketSettings', JSON.stringify(this.settings));
            // 更新全局设置，使新怪物立即使用新设置
            window.gameSettings = this.settings;
            console.log('设置已保存');
        } catch (e) {
            console.log('保存设置失败:', e);
        }
    }

    resetSettings() {
        this.settings = { ...this.defaultSettings };
        this.saveSettings();
        // 更新UI显示
        this.syncSettingsToUI();
        // 更新全局设置
        window.gameSettings = this.settings;
    }

    syncSettingsToUI() {
        // 同步视觉设置
        document.getElementById('showAttackRange').checked = this.settings.showAttackRange;
        document.getElementById('showCollectRange').checked = this.settings.showCollectRange;
        
        // 同步怪物基础数值
        document.getElementById('monsterInitialHP').value = this.settings.monsterInitialHP;
        document.getElementById('monsterInitialAttack').value = this.settings.monsterInitialAttack;
        document.getElementById('monsterInitialSpeed').value = this.settings.monsterInitialSpeed;
        document.getElementById('monsterInitialSize').value = this.settings.monsterInitialSize;
        document.getElementById('monsterMaxMonsters').value = this.settings.monsterMaxMonsters;
        document.getElementById('monsterSpawnInterval').value = this.settings.monsterSpawnInterval;
        
        // 同步怪物成长曲线
        document.getElementById('monsterHPGrowth').value = this.settings.monsterHPGrowth;
        document.getElementById('monsterAttackGrowth').value = this.settings.monsterAttackGrowth;
        document.getElementById('monsterSpeedGrowth').value = this.settings.monsterSpeedGrowth;
        
        // 同步怪物掉落经验
        document.getElementById('monsterExpValue').value = this.settings.monsterExpValue;
        
        // 同步Boss基础数值
        document.getElementById('bossInitialHP').value = this.settings.bossInitialHP;
        document.getElementById('bossAttack').value = this.settings.bossAttack;
        document.getElementById('bossSpeed').value = this.settings.bossSpeed;
        document.getElementById('bossSize').value = this.settings.bossSize;
        document.getElementById('bossSpawnInterval').value = this.settings.bossSpawnInterval;
        
        // 同步Boss成长曲线
        document.getElementById('bossHPGrowth').value = this.settings.bossHPGrowth;
        document.getElementById('bossAttackGrowth').value = this.settings.bossAttackGrowth;
        document.getElementById('bossSpeedGrowth').value = this.settings.bossSpeedGrowth;
        
        // 同步Boss自爆伤害
        document.getElementById('bossExplosionDamage').value = this.settings.bossExplosionDamage;
        
        // 同步Boss掉落红包数量
        document.getElementById('bossRedpacketDropCount').value = this.settings.bossRedpacketDropCount;
        
        // 同步红包掉落经验
        document.getElementById('redpacketExpValue').value = this.settings.redpacketExpValue;
    }

    openSettings() {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
        }
        document.getElementById('settingsScreen').classList.remove('hidden');
        
        // 同步所有设置到UI
        this.syncSettingsToUI();
    }

    closeSettings() {
        // 从UI读取所有设置并保存
        this.readSettingsFromUI();
        this.saveSettings();

        // 更新全局设置，使新怪物立即使用新设置
        window.gameSettings = this.settings;

        document.getElementById('settingsScreen').classList.add('hidden');
        
        // 如果游戏正在进行，恢复游戏
        if (this.player && this.player.hp > 0) {
            this.state = GameState.PLAYING;
            // 重置lastTime以避免deltaTime过大
            this.lastTime = performance.now();
            // 重新启动游戏循环
            this.gameLoop();
        }
    }

    readSettingsFromUI() {
        // 读取视觉设置
        this.settings.showAttackRange = document.getElementById('showAttackRange').checked;
        this.settings.showCollectRange = document.getElementById('showCollectRange').checked;
        
        // 读取怪物基础数值
        this.settings.monsterInitialHP = parseInt(document.getElementById('monsterInitialHP').value) || 30;
        this.settings.monsterInitialAttack = parseInt(document.getElementById('monsterInitialAttack').value) || 10;
        this.settings.monsterInitialSpeed = parseFloat(document.getElementById('monsterInitialSpeed').value) || 1.8;
        this.settings.monsterInitialSize = parseInt(document.getElementById('monsterInitialSize').value) || 25;
        this.settings.monsterMaxMonsters = parseInt(document.getElementById('monsterMaxMonsters').value) || 30;
        this.settings.monsterSpawnInterval = parseInt(document.getElementById('monsterSpawnInterval').value) || 1500;
        
        // 读取怪物成长曲线
        this.settings.monsterHPGrowth = parseFloat(document.getElementById('monsterHPGrowth').value) || 0.1;
        this.settings.monsterAttackGrowth = parseFloat(document.getElementById('monsterAttackGrowth').value) || 0.05;
        this.settings.monsterSpeedGrowth = parseFloat(document.getElementById('monsterSpeedGrowth').value) || 0.02;
        
        // 读取怪物掉落经验
        this.settings.monsterExpValue = parseInt(document.getElementById('monsterExpValue').value) || 10;
        
        // 读取Boss基础数值
        this.settings.bossInitialHP = parseInt(document.getElementById('bossInitialHP').value) || 200;
        this.settings.bossAttack = parseInt(document.getElementById('bossAttack').value) || 20;
        this.settings.bossSpeed = parseFloat(document.getElementById('bossSpeed').value) || 2.2;
        this.settings.bossSize = parseInt(document.getElementById('bossSize').value) || 60;
        this.settings.bossSpawnInterval = parseInt(document.getElementById('bossSpawnInterval').value) || 30000;
        
        // 读取Boss成长曲线
        this.settings.bossHPGrowth = parseFloat(document.getElementById('bossHPGrowth').value) || 0.15;
        this.settings.bossAttackGrowth = parseFloat(document.getElementById('bossAttackGrowth').value) || 0.08;
        this.settings.bossSpeedGrowth = parseFloat(document.getElementById('bossSpeedGrowth').value) || 0.03;
        
        // 读取Boss自爆伤害
        this.settings.bossExplosionDamage = parseInt(document.getElementById('bossExplosionDamage').value) || 30;
        
        // 读取Boss掉落红包数量
        this.settings.bossRedpacketDropCount = parseInt(document.getElementById('bossRedpacketDropCount').value) || 15;
        
        // 读取红包掉落经验
        this.settings.redpacketExpValue = parseInt(document.getElementById('redpacketExpValue').value) || 10;
    }
    
    gameOver() {
        this.state = GameState.GAME_OVER;
        document.getElementById('gameOverScreen').classList.remove('hidden');
        document.getElementById('hud').classList.add('hidden');
        
        document.getElementById('finalRedpackets').textContent = this.totalRedPackets;
        document.getElementById('finalKills').textContent = this.totalKills;
        document.getElementById('finalScore').textContent = this.score;
    }
    
    render() {
        const ctx = this.ctx;
        
        // 清空画布
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 计算缩放因子（移动端缩小视野）
        const zoom = this.isTouchDevice ? CONFIG.MOBILE.CAMERA_ZOOM : 1;
        
        // 保存上下文状态
        ctx.save();
        
        // 应用缩放（以画布中心为基准）
        if (zoom !== 1) {
            ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            ctx.scale(zoom, zoom);
            ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
        }
        
        // 计算摄像机位置（跟随玩家）
        // 移动端让玩家稍微偏上，可以看到更多下方区域
        let playerOffsetY = 0;
        if (this.isTouchDevice) {
            playerOffsetY = this.canvas.height * 0.1; // 移动端玩家偏上10%
        }
        
        const cameraX = this.player.x - this.canvas.width / 2;
        const cameraY = this.player.y - this.canvas.height / 2 + playerOffsetY;
        
        // 绘制地图背景
        this.drawMap(ctx, cameraX, cameraY);
        
        // 绘制红包
        this.redPackets.forEach(redPacket => redPacket.draw(ctx, cameraX, cameraY));
        
        // 绘制怪物
        this.monsters.forEach(monster => monster.draw(ctx, cameraX, cameraY));

        // 绘制Boss
        this.bosses.forEach(boss => boss.draw(ctx, cameraX, cameraY));

        // 绘制玩家
        this.player.draw(ctx, cameraX, cameraY);

        // 绘制攻击效果（半透明特效层）
        this.attackEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));

        // 绘制怪物自爆特效
        this.monsterExplosionEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));

        // 绘制小马受伤特效
        this.playerHurtEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));

        // 重新绘制玩家的emoji（确保在特效层之上）
        this.player.drawEmojiOnly(ctx, cameraX, cameraY);

        // 重新绘制所有怪物的emoji（确保在特效层之上）
        this.monsters.forEach(monster => monster.drawEmojiOnly(ctx, cameraX, cameraY));

        // 重新绘制所有Boss的emoji（确保在特效层之上）
        this.bosses.forEach(boss => boss.drawEmojiOnly(ctx, cameraX, cameraY));

        // 重新绘制所有红包的emoji（确保在特效层之上）
        this.redPackets.forEach(redPacket => redPacket.drawEmojiOnly(ctx, cameraX, cameraY));

        // 恢复上下文状态
        ctx.restore();
    }
    
    drawMap(ctx, cameraX, cameraY) {
        // 绘制渐变背景
        const gradient = ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f0f1e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制美化的网格背景
        const gridSize = 50;
        const startX = Math.floor(cameraX / gridSize) * gridSize;
        const startY = Math.floor(cameraY / gridSize) * gridSize;
        
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.15)';
        ctx.lineWidth = 1;
        
        // 绘制垂直网格线
        for (let x = startX; x < cameraX + this.canvas.width + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x - cameraX, 0);
            ctx.lineTo(x - cameraX, this.canvas.height);
            ctx.stroke();
        }
        
        // 绘制水平网格线
        for (let y = startY; y < cameraY + this.canvas.height + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y - cameraY);
            ctx.lineTo(this.canvas.width, y - cameraY);
            ctx.stroke();
        }

        // 绘制装饰性圆点（在网格交叉点）
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        for (let x = startX; x < cameraX + this.canvas.width + gridSize; x += gridSize) {
            for (let y = startY; y < cameraY + this.canvas.height + gridSize; y += gridSize) {
                ctx.beginPath();
                ctx.arc(x - cameraX, y - cameraY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // 绘制地图边界（带发光效果）
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.8)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 71, 87, 0.6)';
        ctx.strokeRect(-cameraX, -cameraY, CONFIG.MAP_WIDTH, CONFIG.MAP_HEIGHT);
        
        // 绘制外发光边界
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.3)';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 30;
        ctx.strokeRect(-cameraX - 4, -cameraY - 4, CONFIG.MAP_WIDTH + 8, CONFIG.MAP_HEIGHT + 8);
        
        // 绘制地图角落装饰（渐变色）
        const cornerSize = 30;
        const cornerGradient = ctx.createLinearGradient(-cameraX, -cameraY, -cameraX + cornerSize, -cameraY + cornerSize);
        cornerGradient.addColorStop(0, '#ff4757');
        cornerGradient.addColorStop(1, '#ff6b81');
        ctx.fillStyle = cornerGradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 71, 87, 0.5)';

        // 左上角
        ctx.beginPath();
        ctx.moveTo(-cameraX - cornerSize, -cameraY);
        ctx.lineTo(-cameraX, -cameraY);
        ctx.lineTo(-cameraX, -cameraY - cornerSize);
        ctx.closePath();
        ctx.fill();

        // 右上角
        ctx.beginPath();
        ctx.moveTo(CONFIG.MAP_WIDTH - cameraX, -cameraY - cornerSize);
        ctx.lineTo(CONFIG.MAP_WIDTH - cameraX, -cameraY);
        ctx.lineTo(CONFIG.MAP_WIDTH - cameraX + cornerSize, -cameraY);
        ctx.closePath();
        ctx.fill();

        // 左下角
        ctx.beginPath();
        ctx.moveTo(-cameraX, CONFIG.MAP_HEIGHT - cameraY + cornerSize);
        ctx.lineTo(-cameraX, CONFIG.MAP_HEIGHT - cameraY);
        ctx.lineTo(-cameraX - cornerSize, CONFIG.MAP_HEIGHT - cameraY);
        ctx.closePath();
        ctx.fill();

        // 右下角
        ctx.beginPath();
        ctx.moveTo(CONFIG.MAP_WIDTH - cameraX + cornerSize, CONFIG.MAP_HEIGHT - cameraY);
        ctx.lineTo(CONFIG.MAP_WIDTH - cameraX, CONFIG.MAP_HEIGHT - cameraY);
        ctx.lineTo(CONFIG.MAP_WIDTH - cameraX, CONFIG.MAP_HEIGHT - cameraY + cornerSize);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    renderMenuBackground() {
        const ctx = this.ctx;
        const time = Date.now();

        // 渐变背景
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f0f1e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制漂浮的红包装饰
        const packetCount = 15;
        for (let i = 0; i < packetCount; i++) {
            const x = (Math.sin(time * 0.0005 + i * 0.5) * 0.5 + 0.5) * this.canvas.width;
            const y = (Math.cos(time * 0.0003 + i * 0.7) * 0.5 + 0.5) * this.canvas.height;
            const size = 20 + Math.sin(time * 0.001 + i) * 5;

            ctx.save();
            ctx.font = `${size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = 0.3 + Math.sin(time * 0.002 + i) * 0.2;
            ctx.fillText('🧧', x, y);
            ctx.restore();
        }

        // 绘制小马装饰
        const horseX = this.canvas.width / 2 + Math.sin(time * 0.0008) * 100;
        const horseY = this.canvas.height / 2 + Math.cos(time * 0.0006) * 50;

        ctx.save();
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.15;
        ctx.fillText('🐴', horseX, horseY);
        ctx.restore();

        // 如果在菜单状态，继续动画
        if (this.state === GameState.MENU) {
            requestAnimationFrame(() => this.renderMenuBackground());
        }
    }
    
    updateUI() {
        if (!this.player) return;
        
        // 更新血量条
        const healthPercent = (this.player.hp / this.player.maxHp) * 100;
        document.getElementById('healthBar').style.width = `${healthPercent}%`;
        document.getElementById('healthText').textContent = `${Math.ceil(this.player.hp)}/${this.player.maxHp}`;
        
        // 更新经验条
        const expPercent = (this.player.exp / this.player.expToLevel) * 100;
        document.getElementById('expBar').style.width = `${expPercent}%`;
        document.getElementById('expText').textContent = `${this.player.exp}/${this.player.expToLevel}`;
        
        // 更新统计
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('killCount').textContent = this.totalKills;
        document.getElementById('redpacketCount').textContent = this.totalRedPackets;
    }
}

// ==================== 初始化游戏 ====================
window.addEventListener('load', () => {
    new Game();
});