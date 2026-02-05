// ==================== 游戏配置和常量 ====================
const CONFIG = {
    // 地图配置
    MAP_WIDTH: 1600,
    MAP_HEIGHT: 1000,
    
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
        ATTACK_RANGE: 150,
        ATTACK_COOLDOWN: 400
    },

    // 红包配置
    REDPACKET: {
        SIZE: 15,
        COLLECT_RANGE: 150,
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hp = CONFIG.PLAYER.INITIAL_HP;
        this.maxHp = CONFIG.PLAYER.INITIAL_HP;
        this.attackPower = CONFIG.PLAYER.INITIAL_ATTACK;
        this.defense = CONFIG.PLAYER.INITIAL_DEFENSE;
        this.speed = CONFIG.PLAYER.INITIAL_SPEED;
        this.level = CONFIG.PLAYER.INITIAL_LEVEL;
        this.exp = CONFIG.PLAYER.INITIAL_EXP;
        this.expToLevel = CONFIG.PLAYER.INITIAL_EXP_TO_LEVEL;
        this.size = CONFIG.PLAYER.SIZE;
        this.attackRange = CONFIG.PLAYER.ATTACK_RANGE;
        this.attackCooldown = 0;
        this.lastAttackTime = 0;
        this.direction = 1; // 1为右，-1为左
        this.isMoving = false;

        // 攻击动画相关
        this.isAttacking = false;
        this.attackAnimationTime = 0;
        this.attackAnimationDuration = 200;
    }
    
    update(deltaTime, keys) {
        // 移动处理
        let dx = 0;
        let dy = 0;
        
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
                this.hp = this.maxHp;
                break;
            case 'attack':
                this.attackPower += CONFIG.UPGRADE.ATTACK_BONUS;
                break;
            case 'defense':
                this.defense += CONFIG.UPGRADE.DEFENSE_BONUS;
                break;
            case 'speed':
                this.speed += CONFIG.UPGRADE.SPEED_BONUS;
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
        
        // 绘制小马（使用emoji）
        ctx.save();
        ctx.translate(screenX, screenY + shakeY);
        ctx.scale(this.direction * attackScale, attackScale);
        
        // 攻击时的发光效果
        if (attackGlow) {
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#FFD700';
        }
        
        // 绘制小马emoji
        ctx.font = `${this.size * 2.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐴', 0, 0);
        
        // 攻击时的额外光环
        if (attackGlow) {
            const alpha = 1 - (this.attackAnimationTime / this.attackAnimationDuration);
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
        
        ctx.shadowBlur = 0; // 重置发光效果
        
        ctx.restore();
        
        // 攻击范围指示器（移动时显示，攻击时更明显）
        const showAttackRange = this.isMoving || this.isAttacking;
        if (showAttackRange) {
            const rangeAlpha = this.isAttacking ? 0.8 : 0.4;
            const rangeLineWidth = this.isAttacking ? 4 : 2;
            
            ctx.save();
            ctx.strokeStyle = `rgba(255, 215, 0, ${rangeAlpha})`;
            ctx.lineWidth = rangeLineWidth;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(255, 215, 0, ${rangeAlpha})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.attackRange, 0, Math.PI * 2);
            ctx.stroke();
            
            // 攻击时内部填充和虚线效果
            if (this.isAttacking) {
                const fillAlpha = 0.15 * (1 - this.attackAnimationTime / this.attackAnimationDuration);
                ctx.fillStyle = `rgba(255, 215, 0, ${fillAlpha})`;
                ctx.fill();
                
                // 虚线圆环
                ctx.strokeStyle = `rgba(255, 255, 255, ${rangeAlpha * 0.7})`;
                ctx.setLineDash([10, 5]);
                ctx.beginPath();
                ctx.arc(screenX, screenY, this.attackRange * 0.8, 0, Math.PI * 2);
                ctx.stroke();
            }
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
}

// ==================== 怪物类 ====================
class Monster {
    constructor(x, y, difficultyMultiplier) {
        this.x = x;
        this.y = y;
        this.baseHp = CONFIG.MONSTER.INITIAL_HP;
        this.hp = Math.floor(this.baseHp * difficultyMultiplier);
        this.maxHp = this.hp;
        this.attack = Math.floor(CONFIG.MONSTER.INITIAL_ATTACK * difficultyMultiplier);
        this.speed = CONFIG.MONSTER.INITIAL_SPEED + (difficultyMultiplier - 1) * 0.3;
        this.size = CONFIG.MONSTER.INITIAL_SIZE + (difficultyMultiplier - 1) * 2;
        this.damage = this.attack;
        this.expValue = Math.floor(CONFIG.REDPACKET.EXP_VALUE * difficultyMultiplier);
        
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
            shakeX = Math.sin(progress * Math.PI * 10) * this.size * 0.15;
            shakeY = Math.cos(progress * Math.PI * 10) * this.size * 0.15;
            
            // 更新动画时间
            this.hurtAnimationTime += 16;
            if (this.hurtAnimationTime >= this.hurtAnimationDuration) {
                this.isHurt = false;
            }
        }
        
        // 绘制红包怪物（使用emoji）
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        ctx.scale(scale, scale);
        
        // 受伤时的发光效果
        if (this.isHurt) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ffffff';
        }
        
        // 绘制红包emoji
        ctx.font = `${this.size * 1.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);
        
        // 受伤时的额外光环
        if (this.isHurt) {
            const alpha = 1 - (this.hurtAnimationTime / this.hurtAnimationDuration);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.9, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
        
        // 血条
        const healthPercent = this.hp / this.maxHp;
        const barWidth = this.size * 1.2;
        const barHeight = 6;
        const barY = -this.size * 0.8;
        
        // 血条背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(-barWidth / 2, barY, barWidth, barHeight);
        
        // 血条填充
        const barColor = healthPercent > 0.5 ? '#44ff44' : healthPercent > 0.25 ? '#ffaa00' : '#ff4444';
        ctx.fillStyle = barColor;
        ctx.fillRect(-barWidth / 2, barY, barWidth * healthPercent, barHeight);
        
        // 血条边框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-barWidth / 2, barY, barWidth, barHeight);
        
        ctx.restore();
    }
}

// ==================== 红包掉落类 ====================
class RedPacket {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.REDPACKET.SIZE;
        this.expValue = CONFIG.REDPACKET.EXP_VALUE;
        this.velocity = { x: 0, y: 0 };
        this.isBeingCollected = false;
        this.collectedByPlayer = false;
        this.bobAngle = Math.random() * Math.PI * 2;
    }
    
    update(deltaTime, player) {
        // 浮动效果
        this.bobAngle += deltaTime * 0.005;
        
        const distance = Utils.distance(this.x, this.y, player.x, player.y);
        
        // 收集检测
        if (distance < CONFIG.REDPACKET.COLLECT_RANGE) {
            this.isBeingCollected = true;
            this.collectedByPlayer = true;
            
            // 飞向玩家
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const normalized = Utils.normalize(dx, dy);
            
            this.x += normalized.x * CONFIG.REDPACKET.COLLECT_SPEED;
            this.y += normalized.y * CONFIG.REDPACKET.COLLECT_SPEED;
        }
        
        return distance < player.size + this.size;
    }
    
    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY + Math.sin(this.bobAngle) * 5;
        
        ctx.save();
        ctx.translate(screenX, screenY);
        
        // 发光效果
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        
        // 绘制红包emoji（使用💰）
        ctx.font = `${this.size * 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💰', 0, 0);
        
        // 外围光环
        ctx.strokeStyle = `rgba(255, 215, 0, 0.5)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }
}

// ==================== 攻击效果类 ====================
class AttackEffect {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.radius = 0;
        this.maxRadius = CONFIG.PLAYER.ATTACK_RANGE;
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
        this.redPackets = [];
        this.attackEffects = [];

        this.score = 0;
        this.totalRedPackets = 0;
        this.totalKills = 0;
        this.gameTime = 0;
        this.lastSpawnTime = 0;
        this.difficultyMultiplier = 1;

        // 音效系统
        this.soundEffect = new SoundEffect();

        this.setupEventListeners();
        this.updateUI();
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
        document.getElementById('restartButton').addEventListener('click', () => this.startGame());
        
        // 升级选项
        document.querySelectorAll('.upgrade-option').forEach(option => {
            option.addEventListener('click', () => {
                const upgradeType = option.dataset.upgrade;
                this.handleUpgrade(upgradeType);
            });
        });
    }
    
    startGame() {
        this.player = new Player(CONFIG.MAP_WIDTH / 2, CONFIG.MAP_HEIGHT / 2);
        this.monsters = [];
        this.redPackets = [];
        this.attackEffects = [];
        
        this.score = 0;
        this.totalRedPackets = 0;
        this.totalKills = 0;
        this.gameTime = 0;
        this.lastSpawnTime = 0;
        this.difficultyMultiplier = 1;
        
        this.state = GameState.PLAYING;
        
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('upgradeScreen').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        
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

        // 创建攻击效果
        this.attackEffects.push(new AttackEffect(this.player.x, this.player.y, this.player.direction));

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
                    this.redPackets.push(new RedPacket(monster.x, monster.y));
                    this.totalKills++;
                    this.score += 100;
                }
            }
        }

        this.updateUI();
    }
    
    handleUpgrade(upgradeType) {
        if (!this.player) return;
        
        this.player.upgrade(upgradeType);
        this.player.levelUp();
        
        // 恢复满血
        this.player.hp = this.player.maxHp;
        
        document.getElementById('upgradeScreen').classList.add('hidden');
        this.state = GameState.PLAYING;
        
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    spawnMonster(currentTime) {
        if (currentTime - this.lastSpawnTime > CONFIG.MONSTER.SPAWN_INTERVAL / this.difficultyMultiplier) {
            if (this.monsters.length < CONFIG.MONSTER.MAX_MONSTERS * this.difficultyMultiplier) {
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

        // 更新玩家
        this.player.update(deltaTime, this.keys);

        // 更新怪物
        this.monsters.forEach(monster => monster.update(this.player));
        
        // 怪物与玩家碰撞检测
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            const distance = Utils.distance(this.player.x, this.player.y, monster.x, monster.y);
            
            if (distance < this.player.size + monster.size) {
                const damage = this.player.takeDamage(monster.damage);
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
        
        // 计算摄像机位置（跟随玩家）
        const cameraX = this.player.x - this.canvas.width / 2;
        const cameraY = this.player.y - this.canvas.height / 2;
        
        // 绘制地图背景
        this.drawMap(ctx, cameraX, cameraY);
        
        // 绘制红包
        this.redPackets.forEach(redPacket => redPacket.draw(ctx, cameraX, cameraY));
        
        // 绘制怪物
        this.monsters.forEach(monster => monster.draw(ctx, cameraX, cameraY));
        
        // 绘制玩家
        this.player.draw(ctx, cameraX, cameraY);
        
        // 绘制攻击效果（在最顶层，最明显）
        this.attackEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));
    }
    
    drawMap(ctx, cameraX, cameraY) {
        // 绘制网格背景
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        const startX = Math.floor(cameraX / gridSize) * gridSize;
        const startY = Math.floor(cameraY / gridSize) * gridSize;
        
        for (let x = startX; x < cameraX + this.canvas.width + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x - cameraX, 0);
            ctx.lineTo(x - cameraX, this.canvas.height);
            ctx.stroke();
        }
        
        for (let y = startY; y < cameraY + this.canvas.height + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y - cameraY);
            ctx.lineTo(this.canvas.width, y - cameraY);
            ctx.stroke();
        }
        
        // 绘制地图边界
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.strokeRect(-cameraX, -cameraY, CONFIG.MAP_WIDTH, CONFIG.MAP_HEIGHT);
        
        // 绘制地图角落装饰
        const cornerSize = 20;
        ctx.fillStyle = '#ff4444';
        
        // 左上角
        ctx.fillRect(-cameraX - cornerSize, -cameraY - cornerSize, cornerSize, cornerSize);
        // 右上角
        ctx.fillRect(CONFIG.MAP_WIDTH - cameraX, -cameraY - cornerSize, cornerSize, cornerSize);
        // 左下角
        ctx.fillRect(-cameraX - cornerSize, CONFIG.MAP_HEIGHT - cameraY, cornerSize, cornerSize);
        // 右下角
        ctx.fillRect(CONFIG.MAP_WIDTH - cameraX, CONFIG.MAP_HEIGHT - cameraY, cornerSize, cornerSize);
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