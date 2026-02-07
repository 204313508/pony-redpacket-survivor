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
        CAMERA_ZOOM: 0.85, // 移动端摄像机缩放（小于1表示缩小视野，让玩家看到更大区域）
        ELEMENT_SCALE_MULTIPLIER: 1.15, // 移动端元素显示大小倍数（让元素更容易看清）
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
        INITIAL_EXP_TO_LEVEL: 60,
        SIZE: 30,
        ATTACK_RANGE: 160,
        ATTACK_COOLDOWN: 400
    },

    // 红包配置
    REDPACKET: {
        SIZE: 15,
        COLLECT_RANGE: 125,
        COLLECT_SPEED: 10,
        EXP_VALUE: 15
    },
    
    // 怪物配置
    MONSTER: {
        INITIAL_HP: 30,
        INITIAL_ATTACK: 10,
        INITIAL_SPEED: 1.8,
        INITIAL_SIZE: 25,
        SPAWN_INTERVAL: 1500,
        MAX_MONSTERS: 30,
        // 怪物类型配置
        TYPES: {
            normal: {
                id: 'normal',
                name: '普通怪',
                emoji: '🧧',
                badge: null, // 无额外标识
                color: '#ff6b6b',
                hpMultiplier: 1.0,
                speedMultiplier: 1.0,
                attackMultiplier: 1.0,
                sizeMultiplier: 1.0,
                expMultiplier: 1.0,
                isElite: false
            },
            fast: {
                id: 'fast',
                name: '快速怪',
                emoji: '🧧',
                badge: '💨', // 右上角显示风图标
                color: '#00d2d3',
                hpMultiplier: 0.5,
                speedMultiplier: 2.2,
                attackMultiplier: 0.2,
                sizeMultiplier: 0.8,
                expMultiplier: 0.8,
                isElite: false
            },
            tank: {
                id: 'tank',
                name: '坦克怪',
                emoji: '🧧',
                badge: '🛡️', // 右上角显示盾牌图标
                color: '#feca57',
                hpMultiplier: 2.5,
                speedMultiplier: 0.5,
                attackMultiplier: 0.5,
                sizeMultiplier: 1.5,
                expMultiplier: 2.0,
                isElite: false
            },
            suicide: {
                id: 'suicide',
                name: '自爆怪',
                emoji: '🧧',
                badge: '💣', // 右上角显示炸弹图标
                color: '#ff9f43',
                hpMultiplier: 0.8,
                speedMultiplier: 1.5,
                attackMultiplier: 1.5,
                sizeMultiplier: 1.0,
                expMultiplier: 1.2,
                isElite: false,
                // 自爆相关参数
                explodeRange: 120,
                explodeWarningDuration: 500, // 预警时间 0.5 秒
                explodeDamageMultiplier: 1.5 // 自爆伤害倍数（剩余生命值的倍数）
            },
            healer: {
                id: 'healer',
                name: '回复怪',
                emoji: '🧧',
                badge: '💚', // 右上角显示心形图标
                color: '#26de81',
                hpMultiplier: 1.5,
                speedMultiplier: 1.0,
                attackMultiplier: 0.5,
                sizeMultiplier: 1.1,
                expMultiplier: 1.5,
                isElite: true, // 精英怪，显示名称
                redpacketDropCount: 6, // 精英怪掉落红包数量
                // 回血技能参数
                healInterval: 5000, // 每5秒释放一次回血
                healRange: 200, // 回血范围
                healAmountPercent: 0.2, // 每次回复其他怪物20%最大生命值
                healRangeWarningDuration: 500 // 回血预警时间
            },
            shielder: {
                id: 'shielder',
                name: '大盾怪',
                emoji: '🧧',
                badge: '🔰', // 右上角显示护盾图标
                color: '#4b7bec',
                hpMultiplier: 2.0,
                speedMultiplier: 0.8,
                attackMultiplier: 0.7,
                sizeMultiplier: 1.3,
                expMultiplier: 1.8,
                isElite: true, // 精英怪，显示名称
                redpacketDropCount: 5, // 精英怪掉落红包数量
                // 免伤技能参数
                shieldInterval: 6000, // 每6秒释放一次免伤
                shieldRange: 180, // 免伤范围
                shieldDuration: 2000, // 免伤持续2秒
                shieldReduction: 0.5 // 免伤50%
            },
            ranged: {
                id: 'ranged',
                name: '远程怪',
                emoji: '🧧',
                badge: '🎯', // 右上角显示靶心图标
                color: '#fd9644',
                hpMultiplier: 0.6,
                speedMultiplier: 0, // 不移动
                attackMultiplier: 1.2,
                sizeMultiplier: 0.9,
                expMultiplier: 1.0,
                isElite: true, // 精英怪，显示名称
                redpacketDropCount: 4, // 精英怪掉落红包数量
                // 远程攻击参数
                attackRange: 200, // 攻击范围
                attackInterval: 2000, // 攻击间隔2秒
                projectileSpeed: 4, // 弹道速度
                projectileDamage: 15, // 弹道伤害
                projectileSize: 8 // 弹道大小
            }
        },
        // 怪物类型生成权重
        TYPE_WEIGHTS: {
            normal: 35,  // 35%
            fast: 15,    // 15%
            tank: 10,    // 10%
            suicide: 10, // 10%
            healer: 15,  // 15%
            shielder: 10, // 10%
            ranged: 5    // 5%
        }
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
        HP_BONUS: 30,
        ATTACK_BONUS: 8,
        DEFENSE_BONUS: 5,
        SPEED_BONUS: 0.8,
        EXP_MULTIPLIER: 1.2
    },

    // 天气系统配置
    WEATHER: {
        CHANGE_INTERVAL: 10000, // 天气切换间隔（10秒）
        SUNNY_ATTACK_BONUS: 5, // 晴天攻击加成（点数）
        SUNNY_ATTACK_BONUS_PERCENT: 0.05, // 晴天攻击加成（百分比）
        WINDY_SPEED_BONUS: 0.5, // 风天速度加成（点数）
        WINDY_SPEED_BONUS_PERCENT: 0.02, // 风天速度加成（百分比）
        RAINY_HEALTHPOTION_INTERVAL: 2000, // 雨天生成回复包间隔（2秒）
        RAINY_HEALTHPOTION_DURATION: 10000, // 回复包存在时间（10秒）
        RAINY_HEALTHPOTION_AMOUNT: 10, // 回复包回复血量（点数）
        RAINY_HEALTHPOTION_PERCENT: 0.1, // 回复包回复血量（百分比）
        STORMY_LIGHTNING_INTERVAL: 1250, // 雷天雷击间隔（1.25秒）
        STORMY_LIGHTNING_DAMAGE: 30, // 雷击伤害（点数）
        STORMY_LIGHTNING_DAMAGE_PERCENT: 0.1, // 雷击伤害（百分比）
        STORMY_LIGHTNING_WARNING_DURATION: 1000, // 雷击预警时间（1秒）
        STORMY_LIGHTNING_RADIUS: 100, // 雷击半径
        FOGGY_VIEW_DISTANCE: 400, // 雾天可见距离
        FOGGY_ALPHA: 0.85, // 雾天遮罩透明度
        SNOWY_SPEED_PENALTY: 0.02 // 雪天移速降低（2%）
    },

    // 技能系统配置
    SKILL: {
        // 最大可学习的技能数量
        MAX_SKILLS: 3,
        // 技能池配置
        POOL: {
            fleetFoot: {
                id: 'fleetFoot',
                name: '飞毛腿',
                icon: '💨',
                type: 'buff',
                baseCooldown: 15000, // 15秒
                baseDuration: 2000, // 2秒
                baseSpeedBonus: 0.5, // 50%移速
                levelEffects: {
                    duration: 200 // 每级增加0.2秒
                },
                description: '短暂提升移动速度'
            },
            frenzy: {
                id: 'frenzy',
                name: '狂热',
                icon: '🔥',
                type: 'buff',
                baseCooldown: 30000, // 30秒
                baseDuration: 3000, // 3秒
                baseAttackSpeedBonus: 0.5, // 50%攻速
                levelEffects: {
                    duration: 200 // 每级增加0.2秒
                },
                description: '短暂降低攻击间隔，提升攻速'
            },
            stoneSkin: {
                id: 'stoneSkin',
                name: '石化皮肤',
                icon: '🛡️',
                type: 'buff',
                baseCooldown: 30000, // 30秒
                baseDuration: 2000, // 2秒
                baseDefenseBonus: 0.4, // 40%防御
                levelEffects: {
                    duration: 200 // 每级增加0.2秒
                },
                description: '短暂提升防御力'
            },
            heal: {
                id: 'heal',
                name: '回春术',
                icon: '💚',
                type: 'heal',
                baseCooldown: 30000, // 30秒
                baseHealPercent: 0.3, // 30%最大生命
                levelEffects: {
                    healPercent: 0.01 // 每级增加1%
                },
                description: '立即回复生命值'
            },
            skyPunishment: {
                id: 'skyPunishment',
                name: '天罚',
                icon: '⚡',
                type: 'damage',
                baseCooldown: 60000, // 60秒
                baseDamagePercent: 0.5, // 50%最大生命值
                levelEffects: {
                    damagePercent: 0.01 // 每级增加1%伤害
                },
                description: '对全屏敌人造成伤害'
            },
            healField: {
                id: 'healField',
                name: '回血阵',
                icon: '🌟',
                type: 'field',
                baseCooldown: 45000, // 45秒
                baseDuration: 10000, // 10秒
                baseRadius: 150, // 回血阵半径
                baseHealPercentPerSecond: 0.05, // 每秒回复5%
                levelEffects: {
                    healPercentPerSecond: 0.01 // 每级增加1%
                },
                description: '创建持续回血的区域'
            },
            bloodthirst: {
                id: 'bloodthirst',
                name: '嗜血术',
                icon: '🩸',
                type: 'buff',
                baseCooldown: 20000, // 20秒
                baseDuration: 3000, // 3秒
                baseLifestealBonus: 0.1, // 10%吸血
                levelEffects: {
                    duration: 100 // 每级增加0.1秒
                },
                description: '短暂提升吸血能力'
            },
            blink: {
                id: 'blink',
                name: '闪现术',
                icon: '✨',
                type: 'movement',
                baseCooldown: 10000, // 10秒
                baseDistance: 200, // 闪现距离
                baseInvincibleDuration: 300, // 无敌持续时间（毫秒）
                levelEffects: {
                    cooldown: 100 // 每级减少0.1秒冷却
                },
                description: '向当前朝向闪现，期间无敌'
            }
        }
    }
};

// ==================== 怪物图鉴数据 ====================
const BESTIARY = {
    monsters: {
        normal: {
            id: 'normal',
            name: '普通怪',
            emoji: '🧧',
            badge: null,
            color: '#ff6b6b',
            isElite: false,
            description: '最常见的怪物，会追踪玩家并进行攻击。',
            stats: {
                hp: { label: '生命值', value: '普通', class: 'stat-medium' },
                speed: { label: '移动速度', value: '普通', class: 'stat-medium' },
                attack: { label: '攻击力', value: '普通', class: 'stat-medium' },
                behavior: { label: '行为', value: '追踪玩家', class: 'stat-medium' }
            },
            tags: ['基础怪物']
        },
        fast: {
            id: 'fast',
            name: '快速怪',
            emoji: '🧧',
            badge: '💨',
            color: '#00d2d3',
            isElite: false,
            description: '移动速度极快但生命值很低的怪物，攻击力较弱。',
            stats: {
                hp: { label: '生命值', value: '极低', class: 'stat-low' },
                speed: { label: '移动速度', value: '极快', class: 'stat-high' },
                attack: { label: '攻击力', value: '较弱', class: 'stat-low' },
                behavior: { label: '行为', value: '快速追踪', class: 'stat-high' }
            },
            tags: ['速度型', '脆弱']
        },
        tank: {
            id: 'tank',
            name: '坦克怪',
            emoji: '🧧',
            badge: '🛡️',
            color: '#feca57',
            isElite: false,
            description: '拥有极高生命值但移动缓慢的怪物，攻击力较强。',
            stats: {
                hp: { label: '生命值', value: '极高', class: 'stat-high' },
                speed: { label: '移动速度', value: '很慢', class: 'stat-low' },
                attack: { label: '攻击力', value: '较强', class: 'stat-high' },
                behavior: { label: '行为', value: '缓慢追踪', class: 'stat-low' }
            },
            tags: ['防御型', '高血量']
        },
        suicide: {
            id: 'suicide',
            name: '自爆怪',
            emoji: '🧧',
            badge: '💣',
            color: '#ff9f43',
            isElite: false,
            description: '靠近玩家后会停止并准备自爆，对范围内所有单位造成巨额伤害。',
            stats: {
                hp: { label: '生命值', value: '中等', class: 'stat-medium' },
                speed: { label: '移动速度', value: '较快', class: 'stat-high' },
                attack: { label: '攻击力', value: '极高', class: 'stat-high' },
                behavior: { label: '行为', value: '自爆攻击', class: 'stat-high' }
            },
            tags: ['自爆型', '范围伤害'],
            ability: '靠近玩家后停止0.5秒自爆，造成范围伤害'
        },
        healer: {
            id: 'healer',
            name: '回复怪',
            emoji: '🧧',
            badge: '💚',
            color: '#26de81',
            isElite: true,
            description: '精英怪物，周期性为周围其他怪物回复生命值。',
            stats: {
                hp: { label: '生命值', value: '较高', class: 'stat-high' },
                speed: { label: '移动速度', value: '普通', class: 'stat-medium' },
                attack: { label: '攻击力', value: '较弱', class: 'stat-low' },
                behavior: { label: '行为', value: '治疗支援', class: 'stat-high' }
            },
            tags: ['精英怪', '支援型', '治疗'],
            ability: '每5秒为范围内其他怪物回复20%最大生命值'
        },
        shielder: {
            id: 'shielder',
            name: '大盾怪',
            emoji: '🧧',
            badge: '🔰',
            color: '#4b7bec',
            isElite: true,
            description: '精英怪物，周期性为周围怪物添加免伤护盾。',
            stats: {
                hp: { label: '生命值', value: '很高', class: 'stat-high' },
                speed: { label: '移动速度', value: '较慢', class: 'stat-low' },
                attack: { label: '攻击力', value: '较弱', class: 'stat-low' },
                behavior: { label: '行为', value: '防御支援', class: 'stat-high' }
            },
            tags: ['精英怪', '防御型', '支援'],
            ability: '每6秒为范围内怪物添加50%免伤，持续2秒'
        },
        ranged: {
            id: 'ranged',
            name: '远程怪',
            emoji: '🧧',
            badge: '🎯',
            color: '#fd9644',
            isElite: true,
            description: '精英怪物，不会移动，可以发射远程弹道攻击玩家。',
            stats: {
                hp: { label: '生命值', value: '较低', class: 'stat-low' },
                speed: { label: '移动速度', value: '不移动', class: 'stat-low' },
                attack: { label: '攻击力', value: '中等', class: 'stat-medium' },
                behavior: { label: '行为', value: '远程攻击', class: 'stat-high' }
            },
            tags: ['精英怪', '远程型', '弹道'],
            ability: '发射直线弹道攻击，玩家可以通过走位躲避'
        }
    },
    boss: {
        id: 'boss',
        name: 'Boss',
        emoji: '🧧',
        badge: '👑',
        color: '#ff4757',
        isElite: true,
        description: '强大的Boss怪物，拥有极高的生命值和攻击力，可以自爆造成范围伤害。',
        stats: {
            hp: { label: '生命值', value: '极高', class: 'stat-high' },
            speed: { label: '移动速度', value: '较快', class: 'stat-high' },
            attack: { label: '攻击力', value: '极强', class: 'stat-high' },
            behavior: { label: '行为', value: '追踪+自爆', class: 'stat-high' }
        },
        tags: ['Boss', '高血量', '自爆'],
        ability: '可以自爆对周围单位造成伤害，掉落大量红包'
    }
};

// ==================== 游戏状态枚举 ====================
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// ==================== 天气类型枚举 ====================
const WeatherType = {
    SUNNY: 'sunny', // 晴天：攻击+5
    WINDY: 'windy', // 风天：移动速度+0.5
    RAINY: 'rainy', // 雨天：每隔2秒生成回复包
    STORMY: 'stormy', // 雷天：每隔1.25秒出现雷击
    FOGGY: 'foggy', // 雾天：只渲染用户附近的红包，其他地方用特效遮盖
    SNOWY: 'snowy' // 雪天：降低移速2%
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

// ==================== 对象池系统 ====================
/**
 * 通用对象池类
 * 用于复用游戏对象，减少垃圾回收压力
 */
class ObjectPool {
    /**
     * 创建对象池
     * @param {Function} createFn - 创建新对象的函数
     * @param {Function} resetFn - 重置对象状态的函数
     * @param {number} maxSize - 对象池最大容量
     */
    constructor(createFn, resetFn, maxSize = 20) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.maxSize = maxSize;
        this.pool = [];
        this.activeCount = 0;
    }

    /**
     * 从对象池获取对象
     * @param {...any} args - 传递给 resetFn 的参数
     * @returns {Object} 复用的对象
     */
    acquire(...args) {
        let obj;

        if (this.pool.length > 0) {
            // 从池中取出对象
            obj = this.pool.pop();
            // 重置对象状态
            this.resetFn(obj, ...args);
        } else {
            // 池中没有可用对象，创建新对象
            obj = this.createFn(...args);
        }

        this.activeCount++;
        return obj;
    }

    /**
     * 将对象归还到对象池
     * @param {Object} obj - 要归还的对象
     */
    release(obj) {
        if (!obj) return;

        // 如果池未满，则回收对象
        if (this.pool.length < this.maxSize) {
            this.pool.push(obj);
        }

        this.activeCount--;
    }

    /**
     * 获取对象池统计信息
     * @returns {Object} 统计信息
     */
    getStats() {
        return {
            poolSize: this.pool.length,
            activeCount: this.activeCount,
            maxSize: this.maxSize
        };
    }

    /**
     * 清空对象池
     */
    clear() {
        this.pool = [];
        this.activeCount = 0;
    }
}

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
        this.weatherSounds = {};
        this.skillSounds = {};
        this.skillAudioContext = null; // 技能音效的AudioContext
        this.loaded = false;
        this.weatherLoaded = false;
        this.skillLoaded = false;
        this.volume = 0.5;
        this.weatherVolume = 0.3; // 天气音效音量较低
        this.skillVolume = 0.4; // 技能音效音量
        this.currentWeatherSound = null; // 当前正在播放的天气音效
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

    initWeatherSounds() {
        if (this.weatherLoaded) return;

        // 加载天气音效文件
        this.weatherSounds = {
            sunny: new Audio('sounds/weather-sunny.mp3'),
            windy: new Audio('sounds/weather-wind.mp3'),
            rainy: new Audio('sounds/weather-rain.mp3'),
            stormy: new Audio('sounds/weather-storm.mp3'),
            foggy: new Audio('sounds/weather-fog.mp3'),
            snowy: new Audio('sounds/weather-snow.mp3')
        };

        // 设置天气音效属性（循环播放、音量）
        Object.values(this.weatherSounds).forEach(sound => {
            sound.volume = this.weatherVolume;
            sound.loop = true; // 循环播放
            sound.load();
        });

        this.weatherLoaded = true;
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

    // 播放天气音效
    playWeatherSound(weatherType) {
        if (!this.weatherLoaded) this.initWeatherSounds();

        const soundKey = weatherType.toLowerCase();
        const sound = this.weatherSounds[soundKey];

        if (!sound) return;

        // 如果当前已经有天气音效在播放，先停止
        if (this.currentWeatherSound && this.currentWeatherSound !== sound) {
            this.stopWeatherSound();
        }

        // 如果音效未播放，则开始播放
        if (this.currentWeatherSound !== sound) {
            this.currentWeatherSound = sound;
            sound.currentTime = 0;
            sound.play().catch(e => console.log('天气音效播放失败:', e));
        }
    }

    // 停止天气音效
    stopWeatherSound() {
        if (this.currentWeatherSound) {
            this.currentWeatherSound.pause();
            this.currentWeatherSound.currentTime = 0;
            this.currentWeatherSound = null;
        }
    }

    // 设置天气音效音量
    setWeatherVolume(volume) {
        this.weatherVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.weatherSounds).forEach(sound => {
            sound.volume = this.weatherVolume;
        });
    }

    // ==================== 技能音效系统 ====================
    
    initSkillSounds() {
        if (this.skillLoaded) return;

        // 加载技能音效文件
        this.skillSounds = {
            fleetFoot: new Audio('sounds/skill-fleetFoot.wav'),
            frenzy: new Audio('sounds/skill-frenzy.wav'),
            stoneSkin: new Audio('sounds/skill-stoneSkin.wav'),
            heal: new Audio('sounds/skill-heal.wav'),
            skyPunishment: new Audio('sounds/skill-skyPunishment.wav'),
            healField: new Audio('sounds/skill-healField.wav'),
            bloodthirst: new Audio('sounds/skill-bloodthirst.wav'),
            blink: new Audio('sounds/skill-blink.wav')
        };

        // 设置技能音效属性
        Object.values(this.skillSounds).forEach(sound => {
            sound.volume = this.skillVolume;
            sound.load();
        });

        this.skillLoaded = true;
    }

    playSkillEffect(skillId) {
        if (!this.skillLoaded) this.initSkillSounds();
        
        const sound = this.skillSounds[skillId];
        if (sound) {
            const clonedSound = sound.cloneNode();
            clonedSound.volume = this.skillVolume;
            clonedSound.play().catch(e => console.log('技能音效播放失败:', e));
        }
    }

    // 设置技能音效音量
    setSkillVolume(volume) {
        this.skillVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.skillSounds).forEach(sound => {
            sound.volume = this.skillVolume;
        });
    }
}

// ==================== 玩家类 ====================
class Player {
    constructor(x, y, isMobile = false, gameSettings = null) {
        this.x = x;
        this.y = y;
        this.hp = CONFIG.PLAYER.INITIAL_HP;
        this.maxHp = CONFIG.PLAYER.INITIAL_HP;
        this.attackPower = CONFIG.PLAYER.INITIAL_ATTACK;
        this.baseAttackPower = CONFIG.PLAYER.INITIAL_ATTACK;
        this.defense = CONFIG.PLAYER.INITIAL_DEFENSE;
        this.isMobile = isMobile;
        this.gameSettings = gameSettings || { keyBindings: {} };
        
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

        // 暴击系统
        this.critChance = 0.05; // 默认5%暴击率
        this.critDamageMultiplier = 2.0; // 暴击伤害倍数

        // 技能系统
        this.playerSkills = {
            // 已学技能 {skillId: level}
            learned: {},
            // 技能冷却 {skillId: lastUseTime}
            cooldowns: {},
            // 技能持续效果
            effects: {
                fleetFoot: { active: false, endTime: 0 },
                frenzy: { active: false, endTime: 0 },
                stoneSkin: { active: false, endTime: 0 },
                bloodthirst: { active: false, endTime: 0 }
            },
            // 闪现无敌状态
            isInvincible: false,
            invincibleEndTime: 0
        };
    }
    
    update(deltaTime, keys, joystickInput = { x: 0, y: 0 }) {
        // 移动处理
        let dx = 0;
        let dy = 0;
        
        // 获取自定义按键绑定
        const keyBindings = this.gameSettings?.keyBindings || {};
        
        // 键盘输入（使用自定义按键绑定）
        const moveUpKey = keyBindings.moveUp || 'KeyW';
        const moveDownKey = keyBindings.moveDown || 'KeyS';
        const moveLeftKey = keyBindings.moveLeft || 'KeyA';
        const moveRightKey = keyBindings.moveRight || 'KeyD';
        
        if (keys['ArrowUp'] || keys[moveUpKey]) dy -= 1;
        if (keys['ArrowDown'] || keys[moveDownKey]) dy += 1;
        if (keys['ArrowLeft'] || keys[moveLeftKey]) {
            dx -= 1;
            this.direction = -1;
        }
        if (keys['ArrowRight'] || keys[moveRightKey]) {
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
            // 计算攻击冷却时间（考虑狂热技能效果）
            let cooldownTime = CONFIG.PLAYER.ATTACK_COOLDOWN;
            if (this.playerSkills.effects.frenzy.active) {
                cooldownTime = cooldownTime * 0.5; // 狂热效果：攻击冷却减少50%
            }
            this.attackCooldown = cooldownTime;
            this.isAttacking = true;
            this.attackAnimationTime = 0;
            return true;
        }
        return false;
    }

    /**
     * 计算伤害并返回伤害信息
     * @param {boolean} isSkill 是否为技能伤害
     * @returns {Object} { damage: number, isCrit: boolean }
     */
    calculateDamage(isSkill = false) {
        const baseDamage = this.attackPower;

        // 检查是否暴击（技能伤害不能暴击）
        let isCrit = false;
        if (!isSkill && Math.random() < this.critChance) {
            isCrit = true;
        }

        // 计算最终伤害
        const finalDamage = isCrit ? Math.floor(baseDamage * this.critDamageMultiplier) : baseDamage;

        return {
            damage: finalDamage,
            isCrit: isCrit
        };
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
                this.baseAttackPower += CONFIG.UPGRADE.ATTACK_BONUS;
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
                this.baseSpeed += speedBonus;
                break;
        }
    }

    // ==================== 技能系统方法 ====================

    // 学习新技能
    unlockSkill(skillId) {
        if (this.playerSkills.learned[skillId]) return false; // 已学习
        if (Object.keys(this.playerSkills.learned).length >= CONFIG.SKILL.MAX_SKILLS) return false; // 已满

        this.playerSkills.learned[skillId] = 1; // 初始等级1
        return true;
    }

    // 升级现有技能
    upgradeSkill(skillId) {
        if (!this.playerSkills.learned[skillId]) return false; // 未学习

        const currentLevel = this.playerSkills.learned[skillId];
        const skillConfig = CONFIG.SKILL.POOL[skillId];

        if (!skillConfig) return false;

        this.playerSkills.learned[skillId] = currentLevel + 1;
        return true;
    }

    // 获取技能当前属性（考虑等级加成）
    getSkillStats(skillId) {
        const level = this.playerSkills.learned[skillId] || 0;
        if (level === 0) return null;

        const skillConfig = CONFIG.SKILL.POOL[skillId];
        if (!skillConfig) return null;

        const stats = {
            id: skillId,
            name: skillConfig.name,
            icon: skillConfig.icon,
            type: skillConfig.type,
            level: level,
            cooldown: skillConfig.baseCooldown
        };

        // 复制基础属性
        for (const key in skillConfig) {
            if (key.startsWith('base') && typeof skillConfig[key] === 'number') {
                const attrName = key.charAt(4).toLowerCase() + key.substring(5); // baseHealPercent -> healPercent
                stats[attrName] = skillConfig[key];
            }
        }

        // 应用等级加成
        if (skillConfig.levelEffects) {
            for (const [key, value] of Object.entries(skillConfig.levelEffects)) {
                if (stats[key] !== undefined) {
                    stats[key] = stats[key] + value * (level - 1);
                }
            }
        }

        return stats;
    }

    // 检查技能是否可用
    canUseSkill(skillId) {
        if (!this.playerSkills.learned[skillId]) return false;

        const skillConfig = CONFIG.SKILL.POOL[skillId];
        const lastUseTime = this.playerSkills.cooldowns[skillId] || 0;

        // 检查冷却
        const currentTime = Date.now();
        if (currentTime - lastUseTime < skillConfig.baseCooldown) return false;

        return true;
    }

    // 使用技能
    useSkill(skillId) {
        if (!this.canUseSkill(skillId)) return false;

        const skillConfig = CONFIG.SKILL.POOL[skillId];
        const stats = this.getSkillStats(skillId);

        // 记录使用时间
        this.playerSkills.cooldowns[skillId] = Date.now();

        // 根据技能类型应用效果
        switch (skillId) {
            case 'fleetFoot':
                this.playerSkills.effects.fleetFoot.active = true;
                this.playerSkills.effects.fleetFoot.endTime = Date.now() + stats.duration;
                break;
            case 'frenzy':
                this.playerSkills.effects.frenzy.active = true;
                this.playerSkills.effects.frenzy.endTime = Date.now() + stats.duration;
                break;
            case 'stoneSkin':
                this.playerSkills.effects.stoneSkin.active = true;
                this.playerSkills.effects.stoneSkin.endTime = Date.now() + stats.duration;
                break;
            case 'heal':
                const oldHp = this.hp;
                const healAmount = this.maxHp * stats.healPercent;
                this.hp = Math.min(this.maxHp, this.hp + healAmount);
                const actualHeal = this.hp - oldHp;
                return actualHeal; // 返回实际回复量
            case 'bloodthirst':
                this.playerSkills.effects.bloodthirst.active = true;
                this.playerSkills.effects.bloodthirst.endTime = Date.now() + stats.duration;
                break;
            case 'blink':
                this.playerSkills.isInvincible = true;
                this.playerSkills.invincibleEndTime = Date.now() + stats.invincibleDuration;
                // 闪现距离根据当前方向
                this.x += this.direction * stats.distance;
                this.x = Utils.clamp(this.x, this.size, CONFIG.MAP_WIDTH - this.size);
                break;
        }

        return true;
    }

    // 更新技能冷却和持续效果
    updateSkillCooldowns(deltaTime) {
        const currentTime = Date.now();

        // 更新技能持续效果
        for (const skillId in this.playerSkills.effects) {
            const effect = this.playerSkills.effects[skillId];
            if (effect.active && currentTime >= effect.endTime) {
                effect.active = false;
            }
        }

        // 更新闪现无敌状态
        if (this.playerSkills.isInvincible && currentTime >= this.playerSkills.invincibleEndTime) {
            this.playerSkills.isInvincible = false;
        }

        // 应用持续效果到属性
        this.applySkillEffects();
    }

    // 应用技能效果到属性
    applySkillEffects() {
        const currentTime = Date.now();

        // 重置速度为基础值
        this.speed = this.baseSpeed;

        // 飞毛腿效果
        if (this.playerSkills.effects.fleetFoot.active) {
            this.speed = this.baseSpeed * (1 + 0.5);
        }
    }

    // 获取技能冷却剩余时间（毫秒）
    getSkillCooldownRemaining(skillId) {
        const skillConfig = CONFIG.SKILL.POOL[skillId];
        if (!skillConfig) return 0;

        const lastUseTime = this.playerSkills.cooldowns[skillId] || 0;
        const cooldownRemaining = skillConfig.baseCooldown - (Date.now() - lastUseTime);

        return Math.max(0, cooldownRemaining);
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

        // ==================== 技能光环绘制 ====================
        const currentTime = Date.now();

        // 飞毛腿光环（蓝色，速度提升）
        if (this.playerSkills.effects.fleetFoot.active) {
            const remaining = this.playerSkills.effects.fleetFoot.endTime - currentTime;
            const alpha = Math.min(1, remaining / 1000);
            
            ctx.shadowBlur = 25;
            ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
            ctx.stroke();
            
            // 内层光环
            ctx.strokeStyle = `rgba(150, 220, 255, ${alpha * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 狂热光环（橙红色，攻速提升）
        if (this.playerSkills.effects.frenzy.active) {
            const remaining = this.playerSkills.effects.frenzy.endTime - currentTime;
            const alpha = Math.min(1, remaining / 1000);
            
            ctx.shadowBlur = 25;
            ctx.shadowColor = 'rgba(255, 100, 50, 0.8)';
            ctx.strokeStyle = `rgba(255, 100, 50, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
            ctx.stroke();
            
            // 内层光环
            ctx.strokeStyle = `rgba(255, 150, 80, ${alpha * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 石化皮肤光环（灰色，防御提升）
        if (this.playerSkills.effects.stoneSkin.active) {
            const remaining = this.playerSkills.effects.stoneSkin.endTime - currentTime;
            const alpha = Math.min(1, remaining / 1000);
            
            ctx.shadowBlur = 25;
            ctx.shadowColor = 'rgba(150, 150, 150, 0.8)';
            ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.stroke();
            
            // 内层光环
            ctx.strokeStyle = `rgba(180, 180, 180, ${alpha * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 嗜血术光环（暗红色，吸血）
        if (this.playerSkills.effects.bloodthirst.active) {
            const remaining = this.playerSkills.effects.bloodthirst.endTime - currentTime;
            const alpha = Math.min(1, remaining / 1000);
            
            ctx.shadowBlur = 25;
            ctx.shadowColor = 'rgba(200, 50, 50, 0.8)';
            ctx.strokeStyle = `rgba(200, 50, 50, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
            ctx.stroke();
            
            // 内层光环
            ctx.strokeStyle = `rgba(220, 80, 80, ${alpha * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 闪现无敌光环（金色闪烁）
        if (this.playerSkills.isInvincible) {
            const remaining = this.playerSkills.invincibleEndTime - currentTime;
            const alpha = Math.min(1, remaining / 300);
            const pulse = Math.sin(Date.now() / 50) * 0.3 + 0.7;
            
            ctx.shadowBlur = 30;
            ctx.shadowColor = `rgba(255, 215, 0, ${alpha * pulse})`;
            ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * pulse})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.6, 0, Math.PI * 2);
            ctx.stroke();
            
            // 内层光环
            ctx.strokeStyle = `rgba(255, 255, 200, ${alpha * pulse * 0.7})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
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

        // 计算移动端元素缩放
        const elementScale = this.isMobile ? CONFIG.MOBILE.ELEMENT_SCALE_MULTIPLIER : 1;
        const combinedScale = this.direction * attackScale * hurtScale * elementScale;

        ctx.save();
        ctx.translate(screenX + hurtShakeX, screenY + shakeY + hurtShakeY);
        ctx.scale(combinedScale, attackScale * hurtScale * elementScale);

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
    constructor(x, y, difficultyMultiplier, isMobile = false, monsterType = 'normal') {
        this.x = x;
        this.y = y;
        this.isMobile = isMobile;
        
        // 获取怪物类型配置
        const typeConfig = CONFIG.MONSTER.TYPES[monsterType] || CONFIG.MONSTER.TYPES.normal;
        this.type = monsterType;
        this.typeConfig = typeConfig;
        
        // 获取游戏设置
        const settings = window.gameSettings || {};
        
        // 根据类型设置属性
        // 精英怪使用设置的倍率
        const hpMultiplier = typeConfig.isElite ? (settings.eliteHpMultiplier || typeConfig.hpMultiplier) : typeConfig.hpMultiplier;
        const attackMultiplier = typeConfig.isElite ? (settings.eliteAttackMultiplier || typeConfig.attackMultiplier) : typeConfig.attackMultiplier;
        const speedMultiplier = typeConfig.isElite ? (settings.eliteSpeedMultiplier || typeConfig.speedMultiplier) : typeConfig.speedMultiplier;
        const sizeMultiplier = typeConfig.isElite ? (settings.eliteSizeMultiplier || typeConfig.sizeMultiplier) : typeConfig.sizeMultiplier;

        this.baseHp = (settings.monsterInitialHP || CONFIG.MONSTER.INITIAL_HP) * hpMultiplier;
        this.hp = Math.floor(this.baseHp * (1 + (difficultyMultiplier - 1) * (settings.monsterHPGrowth || 0.1) * 10));
        this.maxHp = this.hp;
        this.attack = Math.floor((settings.monsterInitialAttack || CONFIG.MONSTER.INITIAL_ATTACK) * attackMultiplier * (1 + (difficultyMultiplier - 1) * (settings.monsterAttackGrowth || 0.05) * 10));
        
        // 移动端适配速度
        let baseSpeed = (settings.monsterInitialSpeed || CONFIG.MONSTER.INITIAL_SPEED) * speedMultiplier;
        if (isMobile) {
            baseSpeed = baseSpeed * CONFIG.MOBILE.SPEED_MULTIPLIER;
        }
        this.speed = baseSpeed * (1 + (difficultyMultiplier - 1) * (settings.monsterSpeedGrowth || 0.02) * 10);
        
        this.size = ((settings.monsterInitialSize || CONFIG.MONSTER.INITIAL_SIZE) + (difficultyMultiplier - 1) * 2) * sizeMultiplier;
        this.damage = this.attack;
        this.expValue = Math.floor((settings.monsterExpValue || CONFIG.REDPACKET.EXP_VALUE) * difficultyMultiplier * typeConfig.expMultiplier);
        
        // 精英怪属性
        this.isElite = typeConfig.isElite || false;
        this.name = typeConfig.name || '怪物';
        this.redpacketDropCount = settings.eliteRedpacketDropCount || typeConfig.redpacketDropCount || 1;
        
        // 受伤动画相关
        this.isHurt = false;
        this.hurtAnimationTime = 0;
        this.hurtAnimationDuration = 300;
        
        // 自爆怪专用属性
        this.isSuiciding = false; // 是否正在自爆预警
        this.suicideStartTime = 0;
        this.suicideWarningDuration = typeConfig.explodeWarningDuration || 500;
        this.explodeRange = typeConfig.explodeRange || 120;
        this.explodeDamageMultiplier = typeConfig.explodeDamageMultiplier || 1.5;
        
        // 回复怪专用属性
        this.lastHealTime = Date.now();
        this.healInterval = settings.healerInterval || typeConfig.healInterval || 5000;
        this.healRange = settings.healerRange || typeConfig.healRange || 200;
        this.healAmountPercent = settings.healerAmountPercent || typeConfig.healAmountPercent || 0.2;
        this.isHealing = false;
        this.healStartTime = 0;
        this.healRangeWarningDuration = typeConfig.healRangeWarningDuration || 500;
        
        // 大盾怪专用属性
        this.lastShieldTime = Date.now();
        this.shieldInterval = settings.shielderInterval || typeConfig.shieldInterval || 6000;
        this.shieldRange = settings.shielderRange || typeConfig.shieldRange || 180;
        this.shieldDuration = settings.shielderDuration || typeConfig.shieldDuration || 2000;
        this.shieldReduction = settings.shielderReduction || typeConfig.shieldReduction || 0.5;
        this.isShielding = false;
        this.shieldStartTime = 0;
        this.shieldEndTime = 0;
        
        // 远程怪专用属性
        this.attackRange = settings.rangedAttackRange || typeConfig.attackRange || 200;
        this.lastAttackTime = 0;
        this.attackInterval = settings.rangedAttackInterval || typeConfig.attackInterval || 2000;
        this.projectileSpeed = settings.rangedProjectileSpeed || typeConfig.projectileSpeed || 4;
        this.projectileDamage = settings.rangedProjectileDamage || typeConfig.projectileDamage || 15;
        this.projectileSize = typeConfig.projectileSize || 8;
        
        // 免伤状态（被大盾怪加盾）
        this.hasShield = false;
        this.shieldEndTime = 0;
    }
    
    update(player) {
        // 简单的追踪AI
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const currentTime = Date.now();
        
        // 自爆怪特殊行为
        if (this.type === 'suicide') {
            // 如果已经在自爆预警中，不移动
            if (this.isSuiciding) {
                return {
                    exploded: currentTime - this.suicideStartTime >= this.suicideWarningDuration,
                    damage: Math.floor(this.hp * this.explodeDamageMultiplier),
                    range: this.explodeRange,
                    x: this.x,
                    y: this.y
                };
            }
            
            // 距离玩家足够近时开始自爆预警
            if (distance <= this.explodeRange * 0.6) {
                this.isSuiciding = true;
                this.suicideStartTime = currentTime;
                return null;
            }
        }
        
        // 回复怪特殊行为
        if (this.type === 'healer') {
            // 检查是否需要释放回血技能
            if (currentTime - this.lastHealTime >= this.healInterval) {
                this.isHealing = true;
                this.healStartTime = currentTime;
                this.lastHealTime = currentTime;
                
                return {
                    heal: true,
                    healRange: this.healRange,
                    healAmountPercent: this.healAmountPercent,
                    x: this.x,
                    y: this.y
                };
            }
            
            // 如果正在回血预警，不移动
            if (this.isHealing && currentTime - this.healStartTime < this.healRangeWarningDuration) {
                return null;
            }
            
            // 回血预警结束
            if (this.isHealing && currentTime - this.healStartTime >= this.healRangeWarningDuration) {
                this.isHealing = false;
            }
        }
        
        // 大盾怪特殊行为
        if (this.type === 'shielder') {
            // 检查是否需要释放免伤技能
            if (currentTime - this.lastShieldTime >= this.shieldInterval) {
                this.isShielding = true;
                this.shieldStartTime = currentTime;
                this.lastShieldTime = currentTime;
                
                return {
                    shield: true,
                    shieldRange: this.shieldRange,
                    shieldDuration: this.shieldDuration,
                    shieldReduction: this.shieldReduction,
                    x: this.x,
                    y: this.y
                };
            }
            
            // 检查自己的免伤状态
            if (this.isShielding && currentTime >= this.shieldStartTime + this.shieldDuration) {
                this.isShielding = false;
            }
        }
        
        // 远程怪特殊行为
        if (this.type === 'ranged') {
            // 远程怪不移动
            // 检查是否需要发射弹道
            if (distance <= this.attackRange && currentTime - this.lastAttackTime >= this.attackInterval) {
                this.lastAttackTime = currentTime;
                
                // 计算弹道方向
                const normalized = Utils.normalize(dx, dy);
                
                return {
                    shoot: true,
                    projectileX: this.x,
                    projectileY: this.y,
                    projectileSpeed: this.projectileSpeed,
                    projectileDamage: this.projectileDamage,
                    projectileSize: this.projectileSize,
                    directionX: normalized.x,
                    directionY: normalized.y
                };
            }
            return null;
        }
        
        // 正常追踪AI（远程怪不移动）
        if (distance > 0) {
            const normalized = Utils.normalize(dx, dy);
            this.x += normalized.x * this.speed;
            this.y += normalized.y * this.speed;
        }
        
        return null;
    }
    
    takeDamage(damage) {
        // 计算实际造成的伤害（考虑免伤）
        let actualDamage = damage;
        if (this.hasShield && Date.now() < this.shieldEndTime) {
            actualDamage = Math.floor(damage * (1 - this.shieldReduction));
        }
        
        actualDamage = Math.min(actualDamage, this.hp);
        this.hp -= actualDamage;

        // 触发受伤动画
        if (this.hp > 0) {
            this.isHurt = true;
            this.hurtAnimationTime = 0;
        }

        return {
            killed: this.hp <= 0,
            damage: actualDamage
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

            // 受伤时晃动
            shakeX = Math.sin(progress * Math.PI * 12) * this.size * 0.2;
            shakeY = Math.cos(progress * Math.PI * 12) * this.size * 0.2;

            // 更新动画时间
            this.hurtAnimationTime += 16;
            if (this.hurtAnimationTime >= this.hurtAnimationDuration) {
                this.isHurt = false;
            }
        }

        // 计算移动端元素缩放
        const elementScale = this.isMobile ? CONFIG.MOBILE.ELEMENT_SCALE_MULTIPLIER : 1;

        // 绘制怪物的光环（始终存在）
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        ctx.scale(elementScale, elementScale);

        // 根据怪物类型设置光环颜色
        const typeColor = this.typeConfig.color || '#ff6b6b';
        const auraAlpha = 0.3 + Math.sin(Date.now() * 0.003) * 0.1;
        ctx.strokeStyle = `rgba(${this.hexToRgb(typeColor)}, ${auraAlpha * 0.5})`;
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
            ctx.strokeStyle = `rgba(${this.hexToRgb(typeColor)}, ${alpha * 0.7})`;
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

        // 始终绘制红包作为基础图标
        ctx.font = `${this.size * 1.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧧', 0, 0);

        // 如果有特殊类型标识，在右上角叠加显示
        if (this.typeConfig.badge) {
            ctx.font = `${this.size * 0.7}px Arial`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(this.typeConfig.badge, this.size * 0.5, -this.size * 0.7);
        }

        ctx.restore();

        // 自爆怪预警效果
        if (this.type === 'suicide' && this.isSuiciding) {
            const elapsed = Date.now() - this.suicideStartTime;
            const progress = elapsed / this.suicideWarningDuration;
            
            if (progress < 1) {
                ctx.save();
                ctx.translate(screenX, screenY);
                
                // 预警圈（类似雷击预警）
                const warningRadius = this.explodeRange * progress;
                
                // 外围范围圈
                ctx.strokeStyle = `rgba(255, 0, 0, ${0.8 + Math.sin(Date.now() * 0.02) * 0.2})`;
                ctx.lineWidth = 3;
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
                ctx.beginPath();
                ctx.arc(0, 0, this.explodeRange, 0, Math.PI * 2);
                ctx.stroke();
                
                // 逐渐变大的实心内圈
                ctx.fillStyle = `rgba(255, 100, 0, ${0.3 * progress})`;
                ctx.beginPath();
                ctx.arc(0, 0, warningRadius, 0, Math.PI * 2);
                ctx.fill();
                
                // 内圈边缘
                ctx.strokeStyle = `rgba(255, 200, 0, ${0.6 + Math.sin(Date.now() * 0.03) * 0.2})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, warningRadius, 0, Math.PI * 2);
                ctx.stroke();
                
                // 中心警告符号
                ctx.fillStyle = `rgba(255, 0, 0, ${0.8 + Math.sin(Date.now() * 0.01) * 0.2})`;
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💥', 0, 0);
                
                ctx.restore();
            }
        }

        // 回复怪预警效果
        if (this.type === 'healer' && this.isHealing) {
            const elapsed = Date.now() - this.healStartTime;
            const progress = elapsed / this.healRangeWarningDuration;
            
            if (progress < 1) {
                ctx.save();
                ctx.translate(screenX, screenY);
                
                // 回血范围圈（绿色）
                ctx.strokeStyle = `rgba(46, 213, 115, ${0.8 + Math.sin(Date.now() * 0.02) * 0.2})`;
                ctx.lineWidth = 3;
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(46, 213, 115, 0.8)';
                ctx.beginPath();
                ctx.arc(0, 0, this.healRange, 0, Math.PI * 2);
                ctx.stroke();
                
                // 逐渐变大的实心内圈
                ctx.fillStyle = `rgba(46, 213, 115, ${0.3 * progress})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.healRange * progress, 0, Math.PI * 2);
                ctx.fill();
                
                // 中心治疗符号
                ctx.fillStyle = `rgba(46, 213, 115, ${0.8 + Math.sin(Date.now() * 0.01) * 0.2})`;
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💚', 0, 0);
                
                ctx.restore();
            }
        }

        // 大盾怪预警效果
        if (this.type === 'shielder' && this.isShielding) {
            const elapsed = Date.now() - this.shieldStartTime;
            const shieldProgress = elapsed / this.shieldDuration;
            
            ctx.save();
            ctx.translate(screenX, screenY);
            
            // 免伤范围圈（蓝色）
            const alpha = Math.max(0, 1 - shieldProgress);
            ctx.strokeStyle = `rgba(75, 123, 236, ${alpha * 0.8})`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(75, 123, 236, 0.8)';
            ctx.beginPath();
            ctx.arc(0, 0, this.shieldRange, 0, Math.PI * 2);
            ctx.stroke();
            
            // 逐渐消失的填充
            ctx.fillStyle = `rgba(75, 123, 236, ${alpha * 0.2})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.shieldRange, 0, Math.PI * 2);
            ctx.fill();
            
            // 中心盾牌符号
            ctx.fillStyle = `rgba(75, 123, 236, ${alpha})`;
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🔰', 0, 0);
            
            ctx.restore();
        }

        // 免伤状态效果（怪物身上的盾牌）
        if (this.hasShield && Date.now() < this.shieldEndTime) {
            ctx.save();
            ctx.translate(screenX, screenY);
            
            // 盾牌光环
            ctx.strokeStyle = 'rgba(75, 123, 236, 0.8)';
            ctx.lineWidth = 4;
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(75, 123, 236, 0.8)';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        }

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

        // 血条填充（渐变色，根据怪物类型使用不同的颜色）
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

        // 精英怪名称显示（类似boss）
        if (this.isElite) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, 0, barY - 8);
        }

        ctx.restore();
    }

    // 辅助方法：将十六进制颜色转换为RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '255, 107, 107';
    }
}

// ==================== 弹道类 ====================
class Projectile {
    constructor(x, y, speed, damage, size, directionX, directionY) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.size = size;
        this.directionX = directionX;
        this.directionY = directionY;
        this.active = true;
        this.trail = []; // 弹道轨迹
    }
    
    update(deltaTime) {
        // 记录轨迹
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 10) {
            this.trail.shift();
        }
        
        // 移动弹道
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        
        // 检查是否超出地图范围
        if (this.x < 0 || this.x > CONFIG.MAP_WIDTH || this.y < 0 || this.y > CONFIG.MAP_HEIGHT) {
            this.active = false;
        }
    }
    
    checkHit(player) {
        if (!this.active) return false;
        
        const distance = Utils.distance(this.x, this.y, player.x, player.y);
        if (distance <= this.size + player.size) {
            this.active = false;
            return true;
        }
        return false;
    }
    
    draw(ctx, cameraX, cameraY) {
        if (!this.active) return;
        
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;
        
        ctx.save();
        
        // 绘制弹道轨迹
        if (this.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            for (let i = this.trail.length - 1; i >= 0; i--) {
                const point = this.trail[i];
                const pointScreenX = point.x - cameraX;
                const pointScreenY = point.y - cameraY;
                ctx.lineTo(pointScreenX, pointScreenY);
            }
            ctx.strokeStyle = 'rgba(253, 150, 68, 0.3)';
            ctx.lineWidth = this.size * 0.8;
            ctx.stroke();
        }
        
        // 绘制弹道主体
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(253, 150, 68, 0.8)';
        ctx.fillStyle = '#fd9644';
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 弹道核心
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#fffa65';
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// ==================== Boss类 ====================
class Boss {
    constructor(x, y, difficultyMultiplier, isMobile = false) {
        this.x = x;
        this.y = y;
        this.isMobile = isMobile;
        
        // 获取游戏设置
        const settings = window.gameSettings || {};
        
        // 使用设置中的数值
        this.hp = Math.floor((settings.bossInitialHP || CONFIG.BOSS.INITIAL_HP) * (1 + (difficultyMultiplier - 1) * (settings.bossHPGrowth || 0.15) * 10));
        this.maxHp = this.hp;
        this.attack = Math.floor((settings.bossAttack || CONFIG.BOSS.ATTACK) * (1 + (difficultyMultiplier - 1) * (settings.bossAttackGrowth || 0.08) * 10));
        
        // 移动端适配速度
        let baseSpeed = settings.bossSpeed || CONFIG.BOSS.SPEED;
        if (isMobile) {
            baseSpeed = baseSpeed * CONFIG.MOBILE.SPEED_MULTIPLIER;
        }
        this.speed = baseSpeed * (1 + (difficultyMultiplier - 1) * (settings.bossSpeedGrowth || 0.03) * 10);
        
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
        // 计算实际造成的伤害（不超过当前生命值）
        const actualDamage = Math.min(damage, this.hp);
        this.hp -= damage;

        // 触发受伤动画
        if (this.hp > 0) {
            this.isHurt = true;
            this.hurtAnimationTime = 0;
        }

        return {
            killed: this.hp <= 0,
            damage: actualDamage
        };
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

        // 计算移动端元素缩放
        const elementScale = this.isMobile ? CONFIG.MOBILE.ELEMENT_SCALE_MULTIPLIER : 1;
        const combinedScale = scale * breatheScale * elementScale;

        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        ctx.scale(combinedScale, combinedScale);

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

        // 计算移动端元素缩放
        const elementScale = this.isMobile ? CONFIG.MOBILE.ELEMENT_SCALE_MULTIPLIER : 1;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(elementScale, elementScale);

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
}

// ==================== 回复包类 ====================
class HealthPotion {
    constructor(x, y, playerMaxHp, isMobile = false) {
        this.x = x;
        this.y = y;
        this.isMobile = isMobile;
        this.size = 18;
        this.playerMaxHp = playerMaxHp;
        const baseAmount = CONFIG.WEATHER.RAINY_HEALTHPOTION_AMOUNT;
        const percentAmount = playerMaxHp * CONFIG.WEATHER.RAINY_HEALTHPOTION_PERCENT;
        this.healAmount = Math.max(baseAmount, percentAmount);
        this.createTime = Date.now();
        this.lifetime = CONFIG.WEATHER.RAINY_HEALTHPOTION_DURATION;
        this.bobAngle = Math.random() * Math.PI * 2;
    }

    update(deltaTime, player) {
        // 浮动效果
        this.bobAngle += deltaTime * 0.006;

        // 检查是否过期
        const elapsed = Date.now() - this.createTime;
        if (elapsed >= this.lifetime) {
            return { collected: false, expired: true };
        }

        // 检查玩家是否收集
        const distance = Utils.distance(this.x, this.y, player.x, player.y);
        if (distance < player.size + this.size) {
            return { collected: true, expired: false };
        }

        return { collected: false, expired: false };
    }

    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY + Math.sin(this.bobAngle) * 4;

        // 计算生命周期进度
        const elapsed = Date.now() - this.createTime;
        const progress = elapsed / this.lifetime;

        // 计算移动端元素缩放
        const elementScale = this.isMobile ? CONFIG.MOBILE.ELEMENT_SCALE_MULTIPLIER : 1;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(elementScale, elementScale);

        // 剩余时间淡出效果
        const alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

        // 外围光环
        ctx.strokeStyle = `rgba(46, 213, 115, ${alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(46, 213, 115, 0.8)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        // 内部绿色光晕
        const innerAlpha = 0.2 + Math.sin(Date.now() * 0.004) * 0.1;
        ctx.fillStyle = `rgba(46, 213, 115, ${innerAlpha * alpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // 重置所有效果，确保emoji完全清晰
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalAlpha = alpha;
        ctx.globalCompositeOperation = 'source-over';

        // 绘制回复包emoji（使用💚）
        ctx.font = `${this.size * 2.2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💚', 0, 0);

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

    // 对象池使用：重置对象状态
    reset(x, y, direction, attackRange) {
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

    // 对象池使用：重置对象状态
    reset(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.elapsed = 0;
        this.active = true;

        // 重新创建爆炸粒子
        const particleCount = 20;
        this.particles = [];
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

    // 对象池使用：重置对象状态
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.elapsed = 0;
        this.active = true;
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

// ==================== 雷击特效类 ====================
class LightningEffect {
    constructor(x, y, playerMaxHp) {
        this.x = x;
        this.y = y;
        this.warningDuration = CONFIG.WEATHER.STORMY_LIGHTNING_WARNING_DURATION;
        this.warningElapsed = 0;
        this.strikeDuration = 300;
        this.strikeElapsed = 0;
        this.radius = CONFIG.WEATHER.STORMY_LIGHTNING_RADIUS;
        const baseDamage = CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE;
        const percentDamage = playerMaxHp * CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE_PERCENT;
        this.damage = Math.max(baseDamage, percentDamage);
        this.hasStruck = false;
        this.active = true;
        this.struckUnits = []; // 记录已击中的单位
    }

    // 对象池使用：重置对象状态
    reset(x, y, playerMaxHp) {
        this.x = x;
        this.y = y;
        this.warningElapsed = 0;
        this.strikeElapsed = 0;
        const baseDamage = CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE;
        const percentDamage = playerMaxHp * CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE_PERCENT;
        this.damage = Math.max(baseDamage, percentDamage);
        this.hasStruck = false;
        this.active = true;
        this.struckUnits = []; // 清空已击中单位列表
    }

    update(deltaTime) {
        if (!this.hasStruck) {
            // 预警阶段
            this.warningElapsed += deltaTime;
            if (this.warningElapsed >= this.warningDuration) {
                this.hasStruck = true;
            }
        } else {
            // 雷击后效果
            this.strikeElapsed += deltaTime;
            if (this.strikeElapsed >= this.strikeDuration) {
                this.active = false;
            }
        }
    }

    // 检测单位是否被雷击
    checkHit(unit) {
        if (!this.hasStruck) return false;
        if (this.struckUnits.includes(unit)) return false;

        const distance = Utils.distance(this.x, this.y, unit.x, unit.y);
        if (distance <= this.radius) {
            this.struckUnits.push(unit);
            return true;
        }
        return false;
    }

    draw(ctx, cameraX, cameraY) {
        if (!this.active) return;

        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        ctx.save();

        if (!this.hasStruck) {
            // 预警阶段
            const warningProgress = this.warningElapsed / this.warningDuration;
            const innerRadius = this.radius * warningProgress;

            // 外围范围圈
            ctx.strokeStyle = `rgba(255, 165, 0, ${0.8 + Math.sin(Date.now() * 0.02) * 0.2})`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 165, 0, 0.8)';
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2);
            ctx.stroke();

            // 逐渐变大的实心内圈
            ctx.fillStyle = `rgba(255, 140, 0, ${0.3 * warningProgress})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, innerRadius, 0, Math.PI * 2);
            ctx.fill();

            // 内圈边缘
            ctx.strokeStyle = `rgba(255, 255, 0, ${0.6 + Math.sin(Date.now() * 0.03) * 0.2})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(screenX, screenY, innerRadius, 0, Math.PI * 2);
            ctx.stroke();

            // 中心警告符号
            ctx.fillStyle = `rgba(255, 0, 0, ${0.8 + Math.sin(Date.now() * 0.01) * 0.2})`;
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡', screenX, screenY);
        } else {
            // 雷击效果
            const strikeProgress = this.strikeElapsed / this.strikeDuration;
            const alpha = 1 - strikeProgress;

            // 闪电光芒
            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(screenX - this.radius, screenY - this.radius, this.radius * 2, this.radius * 2);

            // 主闪电柱
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.radius);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.3, `rgba(255, 200, 0, ${alpha * 0.8})`);
            gradient.addColorStop(0.6, `rgba(255, 140, 0, ${alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(100, 100, 255, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // 闪电分支效果
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 30;
            ctx.shadowColor = 'rgba(255, 200, 0, 0.9)';

            const branchCount = 6;
            for (let i = 0; i < branchCount; i++) {
                const angle = (Math.PI * 2 / branchCount) * i + Math.random() * 0.3;
                const length = this.radius * (0.5 + Math.random() * 0.5);

                ctx.beginPath();
                ctx.moveTo(screenX, screenY);
                ctx.lineTo(
                    screenX + Math.cos(angle) * length,
                    screenY + Math.sin(angle) * length
                );
                ctx.stroke();
            }

            // 冲击波
            const waveRadius = this.radius * (1 + strikeProgress * 2);
            ctx.strokeStyle = `rgba(100, 100, 255, ${alpha * 0.6})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(screenX, screenY, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }
}

// ==================== 伤害数字类 ====================
class DamageNumber {
    constructor(x, y, value, type = 'normal') {
        this.x = x;
        this.y = y;
        this.value = value;
        this.type = type; // 'normal', 'crit', 'skill', 'heal'
        this.duration = 1000; // 显示持续时间（毫秒）
        this.elapsed = 0;
        this.active = true;
        this.floatDistance = 80; // 向上飘动的距离
        this.initialScale = 1;
        this.shakeAmount = 0;
        
        // 根据类型设置颜色和效果
        switch (type) {
            case 'crit':
                this.color = '#FFD700'; // 金色
                this.initialScale = 1.5;
                this.shakeAmount = 5;
                this.duration = 1200;
                break;
            case 'skill':
                this.color = '#9B59B6'; // 紫色
                this.initialScale = 1.3;
                this.duration = 1100;
                break;
            case 'heal':
                this.color = '#2ED573'; // 绿色
                this.initialScale = 1.2;
                this.duration = 1000;
                break;
            case 'damage':
                this.color = '#FF4757'; // 红色
                this.initialScale = 1.2;
                this.duration = 1000;
                break;
            default:
                this.color = '#FFFFFF'; // 白色
                this.initialScale = 1;
        }

        this.fontSize = 24 * this.initialScale;
    }

    reset(x, y, value, type = 'normal') {
        this.x = x;
        this.y = y;
        this.value = value;
        this.type = type;
        this.elapsed = 0;
        this.active = true;

        // 根据类型重新设置属性
        switch (type) {
            case 'crit':
                this.color = '#FFD700';
                this.initialScale = 1.5;
                this.shakeAmount = 5;
                this.duration = 1200;
                break;
            case 'skill':
                this.color = '#9B59B6';
                this.initialScale = 1.3;
                this.duration = 1100;
                break;
            case 'heal':
                this.color = '#2ED573';
                this.initialScale = 1.2;
                this.duration = 1000;
                break;
            case 'damage':
                this.color = '#FF4757';
                this.initialScale = 1.2;
                this.duration = 1000;
                break;
            default:
                this.color = '#FFFFFF';
                this.initialScale = 1;
                this.shakeAmount = 0;
        }

        this.fontSize = 24 * this.initialScale;
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
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY - (progress * this.floatDistance);
        
        // 计算透明度（逐渐消失）
        const alpha = 1 - Math.pow(progress, 2);
        
        // 计算缩放（先放大后恢复）
        let scale = this.initialScale;
        if (progress < 0.2) {
            scale = this.initialScale * (1 + Math.sin(progress * Math.PI * 5) * 0.2);
        } else {
            scale = this.initialScale * (1 - (progress - 0.2) * 0.5);
        }
        
        // 暴击时的晃动效果
        let shakeX = 0;
        let shakeY = 0;
        if (this.type === 'crit' && progress < 0.3) {
            shakeX = (Math.random() - 0.5) * this.shakeAmount;
            shakeY = (Math.random() - 0.5) * this.shakeAmount;
        }
        
        ctx.save();
        ctx.translate(screenX + shakeX, screenY + shakeY);
        
        // 设置字体和样式
        ctx.font = `bold ${this.fontSize * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 绘制阴影/发光效果
        ctx.shadowBlur = this.type === 'crit' ? 20 : 10;
        ctx.shadowColor = this.color;
        
        // 绘制文字描边
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 3;
        ctx.strokeText(this.value, 0, 0);
        
        // 绘制文字填充
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fillText(this.value, 0, 0);
        
        // 暴击时额外绘制闪光效果
        if (this.type === 'crit' && progress < 0.5) {
            ctx.globalAlpha = alpha * (1 - progress * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(this.value, 0, 0);
        }
        
        ctx.restore();
    }
}

// ==================== 天气系统类 ====================
class WeatherSystem {
    constructor(soundEffect = null) {
        this.currentWeather = WeatherType.SUNNY;
        this.lastWeatherChangeTime = 0;
        this.lastRainyPotionTime = 0;
        this.lastStormyLightningTime = 0;
        this.soundEffect = soundEffect;
    }

    setSoundEffect(soundEffect) {
        this.soundEffect = soundEffect;
    }

    update(currentTime, player, mapWidth, mapHeight, lightningEffectPool) {
        // 检查是否需要切换天气
        if (currentTime - this.lastWeatherChangeTime >= CONFIG.WEATHER.CHANGE_INTERVAL) {
            this.changeWeather();
            this.lastWeatherChangeTime = currentTime;
        }

        // 根据当前天气执行相应的逻辑
        let healthPotions = [];
        let lightningEffects = [];

        if (this.currentWeather === WeatherType.RAINY) {
            // 雨天：每隔5秒生成回复包
            if (currentTime - this.lastRainyPotionTime >= CONFIG.WEATHER.RAINY_HEALTHPOTION_INTERVAL) {
                healthPotions.push(this.spawnHealthPotion(mapWidth, mapHeight, player.maxHp, player.isMobile));
                this.lastRainyPotionTime = currentTime;
            }
        } else if (this.currentWeather === WeatherType.STORMY) {
            // 雷天：每隔3秒生成雷击
            if (currentTime - this.lastStormyLightningTime >= CONFIG.WEATHER.STORMY_LIGHTNING_INTERVAL) {
                lightningEffects.push(this.spawnLightning(mapWidth, mapHeight, player.maxHp, lightningEffectPool));
                this.lastStormyLightningTime = currentTime;
            }
        }

        return { healthPotions, lightningEffects };
    }

    changeWeather() {
        const weathers = Object.values(WeatherType);
        // 随机切换到不同的天气
        let newWeather;
        do {
            newWeather = weathers[Math.floor(Math.random() * weathers.length)];
        } while (newWeather === this.currentWeather);

        this.currentWeather = newWeather;
        console.log('天气切换为:', this.currentWeather);

        // 播放对应的天气音效
        if (this.soundEffect) {
            this.soundEffect.playWeatherSound(this.currentWeather);
        }
    }

    getSpeedBonus() {
        if (this.currentWeather === WeatherType.WINDY) {
            return CONFIG.WEATHER.WINDY_SPEED_BONUS;
        }
        return 0;
    }

    getSpeedBonusPercent() {
        if (this.currentWeather === WeatherType.WINDY) {
            return CONFIG.WEATHER.WINDY_SPEED_BONUS_PERCENT;
        }
        return 0;
    }

    getAttackBonus() {
        if (this.currentWeather === WeatherType.SUNNY) {
            return CONFIG.WEATHER.SUNNY_ATTACK_BONUS;
        }
        return 0;
    }

    getAttackBonusPercent() {
        if (this.currentWeather === WeatherType.SUNNY) {
            return CONFIG.WEATHER.SUNNY_ATTACK_BONUS_PERCENT;
        }
        return 0;
    }

    getHealthPotionAmount(maxHp) {
        if (this.currentWeather === WeatherType.RAINY) {
            const baseAmount = CONFIG.WEATHER.RAINY_HEALTHPOTION_AMOUNT;
            const percentAmount = maxHp * CONFIG.WEATHER.RAINY_HEALTHPOTION_PERCENT;
            return Math.max(baseAmount, percentAmount);
        }
        return 0;
    }

    getLightningDamage(maxHp) {
        if (this.currentWeather === WeatherType.STORMY) {
            const baseDamage = CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE;
            const percentDamage = maxHp * CONFIG.WEATHER.STORMY_LIGHTNING_DAMAGE_PERCENT;
            return Math.max(baseDamage, percentDamage);
        }
        return 0;
    }

    getSpeedPenalty() {
        if (this.currentWeather === WeatherType.SNOWY) {
            return CONFIG.WEATHER.SNOWY_SPEED_PENALTY;
        }
        return 0;
    }

    getSpeedPenaltyPercent() {
        if (this.currentWeather === WeatherType.SNOWY) {
            return CONFIG.WEATHER.SNOWY_SPEED_PENALTY;
        }
        return 0;
    }

    isInFoggyWeather() {
        return this.currentWeather === WeatherType.FOGGY;
    }

    getFoggyViewDistance() {
        return CONFIG.WEATHER.FOGGY_VIEW_DISTANCE;
    }

    spawnHealthPotion(mapWidth, mapHeight, playerMaxHp, isMobile) {
        // 在地图内随机位置生成回复包
        const x = Utils.randomRange(50, mapWidth - 50);
        const y = Utils.randomRange(50, mapHeight - 50);
        return new HealthPotion(x, y, playerMaxHp, isMobile);
    }

    spawnLightning(mapWidth, mapHeight, playerMaxHp, lightningPool) {
        // 在地图内随机位置生成雷击
        const x = Utils.randomRange(100, mapWidth - 100);
        const y = Utils.randomRange(100, mapHeight - 100);
        // 使用对象池创建雷击特效
        return lightningPool.acquire(x, y, playerMaxHp);
    }

    drawBackgroundEffect(ctx, canvasWidth, canvasHeight, cameraX, cameraY, player) {
        ctx.save();

        switch (this.currentWeather) {
            case WeatherType.SUNNY:
                this.drawSunnyEffect(ctx, canvasWidth, canvasHeight);
                break;
            case WeatherType.WINDY:
                this.drawWindyEffect(ctx, canvasWidth, canvasHeight);
                break;
            case WeatherType.RAINY:
                this.drawRainyEffect(ctx, canvasWidth, canvasHeight);
                break;
            case WeatherType.STORMY:
                this.drawStormyEffect(ctx, canvasWidth, canvasHeight);
                break;
            case WeatherType.FOGGY:
                this.drawFoggyEffect(ctx, canvasWidth, canvasHeight, cameraX, cameraY, player);
                break;
            case WeatherType.SNOWY:
                this.drawSnowyEffect(ctx, canvasWidth, canvasHeight);
                break;
        }

        ctx.restore();
    }

    drawSunnyEffect(ctx, width, height) {
        // 晴天：温暖的阳光效果
        const time = Date.now();

        // 阳光光晕
        const gradient = ctx.createRadialGradient(
            width * 0.8, height * 0.1, 0,
            width * 0.8, height * 0.1, width * 0.5
        );
        gradient.addColorStop(0, 'rgba(255, 255, 200, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 150, 50, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 漂浮的阳光粒子
        const particleCount = 10;
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.sin(time * 0.0003 + i * 0.8) * 0.5 + 0.5) * width;
            const y = (Math.cos(time * 0.0002 + i * 0.6) * 0.5 + 0.5) * height;
            const size = 3 + Math.sin(time * 0.001 + i) * 2;

            ctx.fillStyle = `rgba(255, 255, 200, ${0.3 + Math.sin(time * 0.002 + i) * 0.2})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawWindyEffect(ctx, width, height) {
        // 风天：飘逸的风效果
        const time = Date.now();

        // 风的线条
        ctx.strokeStyle = 'rgba(200, 230, 255, 0.2)';
        ctx.lineWidth = 2;

        const windLineCount = 30;
        for (let i = 0; i < windLineCount; i++) {
            const x = ((i * 67 + time * 0.8) % (width + 200)) - 100;
            const y = (i * 43 + Math.sin(i) * height) % height;
            const length = 50 + Math.sin(time * 0.003 + i * 0.5) * 30;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + length, y + Math.sin(time * 0.002 + i) * 10);
            ctx.stroke();
        }

        // 风的粒子
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const x = ((i * 53 + time * 1.2) % (width + 100)) - 50;
            const y = (i * 37 + Math.sin(i) * height) % height;
            const size = 2 + Math.sin(time * 0.001 + i) * 1;

            ctx.fillStyle = `rgba(220, 240, 255, ${0.2 + Math.sin(time * 0.002 + i) * 0.15})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 风天整体色调
        ctx.fillStyle = 'rgba(200, 220, 255, 0.03)';
        ctx.fillRect(0, 0, width, height);
    }

    drawRainyEffect(ctx, width, height) {
        // 雨天：雨滴效果
        const time = Date.now();

        // 雨滴
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
        ctx.lineWidth = 1;

        const rainCount = 100;
        for (let i = 0; i < rainCount; i++) {
            const x = ((i * 37 + time * 0.2) % width);
            const y = ((i * 53 + time * 0.8) % height);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 2, y + 15);
            ctx.stroke();
        }

        // 雨天整体色调
        ctx.fillStyle = 'rgba(100, 150, 255, 0.05)';
        ctx.fillRect(0, 0, width, height);
    }

    drawStormyEffect(ctx, width, height) {
        // 雷天：闪电和暴雨效果
        const time = Date.now();

        // 偶尔的闪电闪光
        const flashIntensity = Math.sin(time * 0.01) > 0.95 ? 0.2 : 0;
        if (flashIntensity > 0) {
            ctx.fillStyle = `rgba(200, 200, 255, ${flashIntensity})`;
            ctx.fillRect(0, 0, width, height);
        }

        // 暴雨
        ctx.strokeStyle = 'rgba(150, 180, 255, 0.4)';
        ctx.lineWidth = 2;

        const rainCount = 150;
        for (let i = 0; i < rainCount; i++) {
            const x = ((i * 37 + time * 0.4) % width);
            const y = ((i * 53 + time * 1.2) % height);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 3, y + 20);
            ctx.stroke();
        }

        // 雷天整体色调
        ctx.fillStyle = 'rgba(80, 80, 120, 0.1)';
        ctx.fillRect(0, 0, width, height);
    }

    drawFoggyEffect(ctx, width, height, cameraX, cameraY, player) {
        // 雾天：只渲染用户附近的区域，其他地方用特效遮盖
        const time = Date.now();
        const viewDistance = CONFIG.WEATHER.FOGGY_VIEW_DISTANCE;

        // 创建径向渐变，中心透明，边缘雾色
        // 计算玩家在屏幕上的位置
        const playerScreenX = player.x - cameraX;
        const playerScreenY = player.y - cameraY;

        // 创建雾效果渐变
        const gradient = ctx.createRadialGradient(
            playerScreenX, playerScreenY, 0,
            playerScreenX, playerScreenY, viewDistance
        );

        // 中心透明（玩家附近），边缘雾色
        gradient.addColorStop(0, 'rgba(200, 200, 210, 0)');
        gradient.addColorStop(0.6, 'rgba(200, 200, 210, 0.2)');
        gradient.addColorStop(0.85, 'rgba(180, 180, 190, 0.6)');
        gradient.addColorStop(1, `rgba(160, 160, 170, ${CONFIG.WEATHER.FOGGY_ALPHA})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 添加雾的粒子效果（在雾区域中）
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        const fogParticleCount = 30;
        for (let i = 0; i < fogParticleCount; i++) {
            const x = ((i * 47 + time * 0.05) % width);
            const y = ((i * 61 + time * 0.03) % height);
            const size = 2 + Math.sin(time * 0.001 + i) * 1;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 雾天整体色调
        ctx.fillStyle = 'rgba(180, 180, 190, 0.08)';
        ctx.fillRect(0, 0, width, height);
    }

    drawSnowyEffect(ctx, width, height) {
        // 雪天：雪花飘落效果
        const time = Date.now();

        // 雪花
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        const snowCount = 80;
        for (let i = 0; i < snowCount; i++) {
            const x = ((i * 53 + time * 0.15) % (width + 100)) - 50;
            const y = ((i * 67 + time * 0.1) % (height + 100)) - 50;
            const size = 2 + Math.sin(i) * 1;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 较大的雪花
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        const largeSnowCount = 15;
        for (let i = 0; i < largeSnowCount; i++) {
            const x = ((i * 89 + time * 0.08) % (width + 100)) - 50;
            const y = ((i * 101 + time * 0.05) % (height + 100)) - 50;
            const size = 3 + Math.sin(time * 0.002 + i) * 2;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 雪天整体色调
        ctx.fillStyle = 'rgba(220, 230, 240, 0.05)';
        ctx.fillRect(0, 0, width, height);
    }

    getWeatherIcon() {
        switch (this.currentWeather) {
            case WeatherType.SUNNY:
                return '☀️';
            case WeatherType.WINDY:
                return '💨';
            case WeatherType.RAINY:
                return '🌧️';
            case WeatherType.STORMY:
                return '⛈️';
            case WeatherType.FOGGY:
                return '🌫️';
            case WeatherType.SNOWY:
                return '❄️';
            default:
                return '☀️';
        }
    }

    getWeatherName() {
        switch (this.currentWeather) {
            case WeatherType.SUNNY:
                return '晴天';
            case WeatherType.WINDY:
                return '风天';
            case WeatherType.RAINY:
                return '雨天';
            case WeatherType.STORMY:
                return '雷天';
            case WeatherType.FOGGY:
                return '雾天';
            case WeatherType.SNOWY:
                return '雪天';
            default:
                return '晴天';
        }
    }

    getWeatherShortEffect() {
        switch (this.currentWeather) {
            case WeatherType.SUNNY:
                return '攻击提升';
            case WeatherType.WINDY:
                return '速度提升';
            case WeatherType.RAINY:
                return '生成回复包';
            case WeatherType.STORMY:
                return '随机落雷';
            case WeatherType.FOGGY:
                return '视野受限';
            case WeatherType.SNOWY:
                return '移速降低';
            default:
                return '';
        }
    }

    getWeatherDescription() {
        switch (this.currentWeather) {
            case WeatherType.SUNNY:
                return '攻击力 +5';
            case WeatherType.WINDY:
                return '移动速度 +0.5';
            case WeatherType.RAINY:
                return '每隔2秒生成回复包';
            case WeatherType.STORMY:
                return '每隔1.25秒出现雷击';
            case WeatherType.FOGGY:
                return '只渲染用户附近的红包';
            case WeatherType.SNOWY:
                return '移速降低2%';
            default:
                return '';
        }
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
        this.healthPotions = [];
        this.lightningEffects = [];
        this.damageNumbers = [];
        this.projectiles = []; // 弹道数组

        // 技能系统
        this.skillEffects = [];
        this.healFields = [];

        // 游戏循环控制
        this.gameLoopRunning = false;
        this.gameLoopRequestId = null;

        // 菜单动画控制
        this.menuAnimationId = null;

        // 天气系统
        this.weatherSystem = new WeatherSystem();

        // 性能监控系统
        this.performanceMonitor = {
            fps: 60,
            frameTime: 0,
            lowFpsCount: 0,
            highFpsCount: 0,
            lastCheckTime: 0,
            renderQuality: 3 // 渲染质量等级：3=高，2=中，1=低
        };

        this.score = 0;
        this.totalRedPackets = 0;
        this.totalKills = 0;
        this.gameTime = 0;
        this.lastSpawnTime = 0;
        this.lastBossSpawnTime = 0;
        this.difficultyMultiplier = 1;

        // 音效系统
        this.soundEffect = new SoundEffect();

        // 设置天气系统的音效
        this.weatherSystem.setSoundEffect(this.soundEffect);

        // ==================== 特效对象池系统 ====================
        // 攻击特效对象池
        this.attackEffectPool = new ObjectPool(
            (x, y, direction, attackRange) => new AttackEffect(x, y, direction, attackRange),
            (effect, x, y, direction, attackRange) => effect.reset(x, y, direction, attackRange),
            10 // 最大容量10个
        );

        // 怪物爆炸特效对象池
        this.monsterExplosionEffectPool = new ObjectPool(
            (x, y, size) => new MonsterExplosionEffect(x, y, size),
            (effect, x, y, size) => effect.reset(x, y, size),
            10 // 最大容量10个
        );

        // 玩家受伤特效对象池
        this.playerHurtEffectPool = new ObjectPool(
            (x, y) => new PlayerHurtEffect(x, y),
            (effect, x, y) => effect.reset(x, y),
            5 // 最大容量5个
        );

        // 雷击特效对象池
        this.lightningEffectPool = new ObjectPool(
            (x, y, playerMaxHp) => new LightningEffect(x, y, playerMaxHp),
            (effect, x, y, playerMaxHp) => effect.reset(x, y, playerMaxHp),
            5 // 最大容量5个
        );

        // 伤害数字对象池
        this.damageNumberPool = new ObjectPool(
            (x, y, value, type) => new DamageNumber(x, y, value, type),
            (number, x, y, value, type) => number.reset(x, y, value, type),
            20 // 最大容量20个
        );

        // 移动端虚拟摇杆
        this.joystick = null;
        this.joystickInput = { x: 0, y: 0 };
        this.isTouchDevice = 'ontouchstart' in window;

        // 游戏设置
        this.defaultSettings = {
            // 视觉设置
            showAttackRange: true,
            showCollectRange: false,
            autoAttack: true, // 自动攻击
            showSkillCooldown: true, // 显示技能冷却时间数字
            showDamageNumbers: true, // 显示伤害数字
            // 渲染质量预设
            renderQualityPreset: 'auto', // 'auto', 'high', 'medium', 'low', 'custom'
            // 详细渲染质量设置
            qualitySettings: {
                effectQuality: 'high', // 'high', 'medium', 'low'
                shadowQuality: 'high', // 'high', 'medium', 'low', 'off'
                damageNumberQuality: 'high', // 'high', 'medium', 'low'
                animationQuality: 'high', // 'high', 'medium', 'low'
                particleQuality: 'high' // 'high', 'medium', 'low', 'off'
            },
            // 按键绑定
            keyBindings: {
                moveUp: 'KeyW',
                moveDown: 'KeyS',
                moveLeft: 'KeyA',
                moveRight: 'KeyD',
                skill1: 'Digit1',
                skill2: 'Digit2',
                skill3: 'Digit3'
            },
            // 移动端按钮位置
            mobileButtonPositions: {
                joystick: 'left',
                attackButton: 'right'
            },
            // 红包设置
            redpacketExpValue: 10, // 红包掉落经验
            // 怪物基础数值
            monsterInitialHP: 30,
            monsterInitialAttack: 10,
            monsterInitialSpeed: 1.8,
            monsterInitialSize: 25,
            monsterMaxMonsters: 30,
            monsterSpawnInterval: 1500,
            // 怪物成长曲线
            monsterHPGrowth: 0.05,
            monsterAttackGrowth: 0.02,
            monsterSpeedGrowth: 0.01,
            // 怪物掉落经验
            monsterExpValue: 10,
            // Boss基础数值
            bossInitialHP: 200,
            bossAttack: 20,
            bossSpeed: 2.2,
            bossSize: 60,
            bossSpawnInterval: 30000,
            // Boss成长曲线
            bossHPGrowth: 0.08,
            bossAttackGrowth: 0.04,
            bossSpeedGrowth: 0.02,
            // Boss自爆伤害
            bossExplosionDamage: 30,
            // Boss掉落红包数量
            bossRedpacketDropCount: 15,
            // 精英怪基础数值
            eliteHpMultiplier: 1.5,
            eliteAttackMultiplier: 0.5,
            eliteSpeedMultiplier: 1.0,
            eliteSizeMultiplier: 1.1,
            eliteRedpacketDropCount: 6,
            // 精英怪技能参数
            healerInterval: 5000,
            healerRange: 200,
            healerAmountPercent: 0.2,
            shielderInterval: 6000,
            shielderRange: 180,
            shielderDuration: 2000,
            shielderReduction: 0.5,
            rangedAttackInterval: 2000,
            rangedAttackRange: 200,
            rangedProjectileSpeed: 4,
            rangedProjectileDamage: 15
        };

        // 从localStorage加载设置，如果没有则使用默认设置
        this.settings = this.loadSettings();
        
        // 保存用户最后一次的自定义质量设置
        this.customQualitySettings = { ...this.defaultSettings.qualitySettings };

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

            // 如果正在设置界面中监听按键，不处理其他按键
            if (this.isListeningForKeybind) {
                return;
            }

            // ESC键切换暂停状态
            if (e.code === 'Escape') {
                this.togglePause();
                e.preventDefault();
                return;
            }

            // 技能快捷键
            const keyBindings = this.settings?.keyBindings || {};
            if (this.state === GameState.PLAYING && this.player) {
                if (e.code === keyBindings.skill1) {
                    this.handleSkillSlotClick(0);
                    e.preventDefault();
                    return;
                }
                if (e.code === keyBindings.skill2) {
                    this.handleSkillSlotClick(1);
                    e.preventDefault();
                    return;
                }
                if (e.code === keyBindings.skill3) {
                    this.handleSkillSlotClick(2);
                    e.preventDefault();
                    return;
                }
            }

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

        // 标签页切换事件
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabSwitch(e));
        });

        // 按键绑定按钮事件
        document.querySelectorAll('.keybind-button').forEach(button => {
            button.addEventListener('click', (e) => this.handleKeybindClick(e));
        });

        // 设置选项事件
        document.getElementById('showAttackRange').addEventListener('change', (e) => {
            this.settings.showAttackRange = e.target.checked;
        });

        document.getElementById('showCollectRange').addEventListener('change', (e) => {
            this.settings.showCollectRange = e.target.checked;
        });

        document.getElementById('autoAttack').addEventListener('change', (e) => {
            this.settings.autoAttack = e.target.checked;
        });

        // 渲染质量预设变化事件
        document.getElementById('renderQualityPreset').addEventListener('change', (e) => {
            this.handleRenderQualityPresetChange(e.target.value);
        });

        // 移动端攻击按钮事件
        const attackButton = document.getElementById('attackButton');
        attackButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.state === GameState.PLAYING) {
                this.executeAttack();
            }
        });

        // ==================== 技能系统事件监听器 ====================

        // 桌面端技能槽点击事件
        document.querySelectorAll('.skill-slot').forEach((slot, index) => {
            slot.addEventListener('click', () => {
                if (this.state === GameState.PLAYING) {
                    this.handleSkillSlotClick(index);
                }
            });
        });

        // 移动端技能按钮触摸事件
        document.querySelectorAll('.mobile-skill-button').forEach((button, index) => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (this.state === GameState.PLAYING) {
                    this.handleSkillSlotClick(index);
                }
            });
        });

        // ==================== 暂停系统事件监听器 ====================

        // 暂停按钮事件
        document.getElementById('pauseButton').addEventListener('click', () => {
            this.togglePause();
        });

        // ==================== 图鉴系统事件监听器 ====================

        // 开始界面图鉴按钮
        document.getElementById('bestiaryButton').addEventListener('click', () => {
            this.openBestiary();
        });

        // HUD图鉴按钮
        document.getElementById('hudBestiaryButton').addEventListener('click', () => {
            this.openBestiary();
        });

        // 关闭图鉴按钮
        document.getElementById('closeBestiaryButton').addEventListener('click', () => {
            this.closeBestiary();
        });

        // 返回图鉴列表按钮
        document.getElementById('backToBestiary').addEventListener('click', () => {
            this.showBestiaryGrid();
        });

        // 暂停界面 - 继续游戏按钮
        document.getElementById('resumeButton').addEventListener('click', () => {
            this.resumeGame();
        });

        // 暂停界面 - 查看设置按钮
        document.getElementById('pauseSettingsButton').addEventListener('click', () => {
            this.openPauseSettings();
        });

        // 暂停界面 - 返回首页按钮
        document.getElementById('returnToMenuButton').addEventListener('click', () => {
            this.returnToMenu();
        });

        // 移动端可见性变化事件（切换应用时自动暂停）
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.state === GameState.PLAYING) {
                // 应用切换到后台，自动暂停
                this.pauseGame();
            }
        });
    }

    // 处理技能槽点击
    handleSkillSlotClick(slotIndex) {
        if (!this.player) return;

        const learnedSkills = Object.keys(this.player.playerSkills.learned);
        if (slotIndex >= learnedSkills.length) return;

        const skillId = learnedSkills[slotIndex];
        this.handleSkillUse(skillId);
    }
    
    startGame() {
        // 取消菜单动画（如果正在运行）
        if (this.menuAnimationId) {
            cancelAnimationFrame(this.menuAnimationId);
            this.menuAnimationId = null;
        }

        // 重置游戏循环状态
        this.gameLoopRunning = false;
        this.gameLoopRequestId = null;

        this.player = new Player(CONFIG.MAP_WIDTH / 2, CONFIG.MAP_HEIGHT / 2, this.isTouchDevice, this.settings);
        this.monsters = [];
        this.bosses = [];
        this.redPackets = [];
        this.attackEffects = [];
        this.monsterExplosionEffects = [];
        this.playerHurtEffects = [];
        this.healthPotions = [];
        this.lightningEffects = [];
        this.damageNumbers = [];
        this.projectiles = []; // 初始化弹道数组

        // 清空技能栏UI
        this.clearSkillBarUI();

        // 重置技能特效
        this.skillEffects = [];
        this.healFields = [];

        // 重置天气系统
        this.weatherSystem = new WeatherSystem();
        this.weatherSystem.setSoundEffect(this.soundEffect);

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

        // 渲染技能栏
        this.renderSkillBar();

        // 重置时间
        this.lastTime = performance.now();
        
        // 启动游戏循环
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
        this.attackEffects.push(this.attackEffectPool.acquire(this.player.x, this.player.y, this.player.direction, this.player.attackRange));

                        // 检测攻击范围内的怪物
                const attackRadius = this.player.attackRange;
        
                for (let i = this.monsters.length - 1; i >= 0; i--) {
                    const monster = this.monsters[i];
                    const distance = Utils.distance(this.player.x, this.player.y, monster.x, monster.y);
        
                    if (distance <= attackRadius) {
                        // 计算伤害和暴击
                        const damageInfo = this.player.calculateDamage(false);
                        const result = monster.takeDamage(damageInfo.damage);
        
                        // 显示伤害数字
                        const damageType = damageInfo.isCrit ? 'crit' : 'normal';
                        this.damageNumbers.push(this.damageNumberPool.acquire(monster.x, monster.y - monster.size, result.damage, damageType));
        
                        // 嗜血术吸血效果
                        if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                            const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                            const lifestealPercent = skillConfig.baseLifestealBonus;
                            const healAmount = result.damage * lifestealPercent;
        
                            // 只在实际回复血量时显示
                            const oldHp = this.player.hp;
                            this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                            const actualHeal = this.player.hp - oldHp;
        
                            if (actualHeal > 0) {
                                this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                            }
                        }
        
                        if (result.killed) {
                            // 播放怪物死亡音效
                            this.soundEffect.playMonsterDeath();
                    // 怪物死亡，掉落红包
                    this.monsters.splice(i, 1);
                    
                    // 精英怪掉落多个红包
                    const dropCount = monster.isElite ? monster.redpacketDropCount : 1;
                    for (let k = 0; k < dropCount; k++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dropDistance = Utils.randomRange(30, 80);
                        const dropX = monster.x + Math.cos(angle) * dropDistance;
                        const dropY = monster.y + Math.sin(angle) * dropDistance;
                        this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                    }
                    
                    this.totalKills++;
                    this.score += monster.isElite ? 300 : 100;
                }
            }
        }

        // 检测攻击范围内的Boss
        for (let i = this.bosses.length - 1; i >= 0; i--) {
            const boss = this.bosses[i];
            const distance = Utils.distance(this.player.x, this.player.y, boss.x, boss.y);

            if (distance <= attackRadius) {
                // 计算伤害和暴击
                const damageInfo = this.player.calculateDamage(false);
                const result = boss.takeDamage(damageInfo.damage);

                // 显示伤害数字
                const damageType = damageInfo.isCrit ? 'crit' : 'normal';
                this.damageNumbers.push(this.damageNumberPool.acquire(boss.x, boss.y - boss.size, result.damage, damageType));

                // 嗜血术吸血效果
                if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                    const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                    const lifestealPercent = skillConfig.baseLifestealBonus;
                    const healAmount = result.damage * lifestealPercent;

                    // 只在实际回复血量时显示
                    const oldHp = this.player.hp;
                    this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                    const actualHeal = this.player.hp - oldHp;

                    if (actualHeal > 0) {
                        this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                    }
                }

                if (result.killed) {
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

        // 重置时间以避免deltaTime过大
        this.lastTime = performance.now();
        
        // 启动游戏循环
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

                // 根据权重随机选择怪物类型
                const monsterType = this.getRandomMonsterType();
                
                this.monsters.push(new Monster(clampedX, clampedY, this.difficultyMultiplier, this.player.isMobile, monsterType));
            }

            this.lastSpawnTime = currentTime;
        }
    }

    // 根据权重随机选择怪物类型
    getRandomMonsterType() {
        const weights = CONFIG.MONSTER.TYPE_WEIGHTS;
        
        // 检查场上是否已有精英怪
        const hasElite = this.monsters.some(monster => monster.isElite);
        
        // 如果已有精英怪，从权重中移除精英怪的选项
        let adjustedWeights = { ...weights };
        if (hasElite) {
            // 按比例重新分配精英怪的权重到其他类型
            const eliteWeight = weights.healer + weights.shielder + weights.ranged;
            const nonEliteWeight = 100 - eliteWeight;
            const multiplier = 100 / nonEliteWeight;
            
            // 移除精英怪权重
            delete adjustedWeights.healer;
            delete adjustedWeights.shielder;
            delete adjustedWeights.ranged;
            
            // 重新分配权重
            for (const type in adjustedWeights) {
                adjustedWeights[type] = Math.floor(adjustedWeights[type] * multiplier);
            }
        }
        
        const totalWeight = Object.values(adjustedWeights).reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const [type, weight] of Object.entries(adjustedWeights)) {
            random -= weight;
            if (random <= 0) {
                return type;
            }
        }
        
        return 'normal'; // 默认返回普通怪
    }
    
    updateDifficulty() {
        // 每30秒难度增加
        this.difficultyMultiplier = 1 + (this.gameTime / 30000) * 0.25;
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

            this.bosses.push(new Boss(clampedX, clampedY, this.difficultyMultiplier, this.player.isMobile));
            this.lastBossSpawnTime = currentTime;
        }
    }

    updatePerformanceMonitor(currentTime) {
        // 只在自动模式下才进行性能监控
        if (this.settings.renderQuality !== 'auto') return;

        const pm = this.performanceMonitor;

        // 计算当前FPS
        const currentFps = 1000 / (currentTime - pm.lastCheckTime);
        pm.lastCheckTime = currentTime;

        // 平滑FPS值
        pm.fps = pm.fps * 0.9 + currentFps * 0.1;

        // 每30帧检查一次性能
        pm.frameTime += 1;
        if (pm.frameTime < 30) return;
        pm.frameTime = 0;

        // 根据FPS调整渲染质量
        if (pm.fps < 30) {
            pm.lowFpsCount++;
            pm.highFpsCount = 0;

            // 持续低FPS，降低渲染质量
            if (pm.lowFpsCount > 3 && pm.renderQuality > 1) {
                pm.renderQuality--;
                pm.lowFpsCount = 0;
                console.log(`性能下降，降低渲染质量至等级 ${pm.renderQuality}`);
            }
        } else if (pm.fps > 50) {
            pm.highFpsCount++;
            pm.lowFpsCount = 0;

            // 持续高FPS，提升渲染质量
            if (pm.highFpsCount > 10 && pm.renderQuality < 3) {
                pm.renderQuality++;
                pm.highFpsCount = 0;
                console.log(`性能良好，提升渲染质量至等级 ${pm.renderQuality}`);
            }
        }
    }

    // 获取当前渲染质量等级
    getCurrentRenderQuality() {
        const quality = this.settings.renderQuality;
        if (quality === 'auto') {
            return this.performanceMonitor.renderQuality;
        }
        // 将字符串转换为数字
        const qualityMap = { 'high': 3, 'medium': 2, 'low': 1 };
        return qualityMap[quality] || 3;
    }

    gameLoop() {
        // 防止重复启动游戏循环
        if (this.state !== GameState.PLAYING) {
            this.gameLoopRunning = false;
            this.gameLoopRequestId = null;
            return;
        }

        // 标记游戏循环正在运行
        this.gameLoopRunning = true;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.gameTime += deltaTime;

        // 性能监控（仅在自动模式下）
        if (this.settings.renderQuality === 'auto') {
            this.updatePerformanceMonitor(currentTime);
        }
        
        // 更新难度
        this.updateDifficulty();

        // 更新天气系统
        const weatherResult = this.weatherSystem.update(currentTime, this.player, CONFIG.MAP_WIDTH, CONFIG.MAP_HEIGHT, this.lightningEffectPool);
        if (weatherResult.healthPotions.length > 0) {
            this.healthPotions.push(...weatherResult.healthPotions);
        }
        if (weatherResult.lightningEffects.length > 0) {
            this.lightningEffects.push(...weatherResult.lightningEffects);
        }

        // 应用风天速度加成和雪天速度惩罚
        const speedBonus = this.weatherSystem.getSpeedBonus();
        const speedBonusPercent = this.weatherSystem.getSpeedBonusPercent();
        const speedPenalty = this.weatherSystem.getSpeedPenalty();
        const speedPenaltyPercent = this.weatherSystem.getSpeedPenaltyPercent();

        if (speedBonus > 0 && speedPenalty === 0) {
            // 只有风天加成
            const percentSpeed = this.player.baseSpeed * speedBonusPercent;
            this.player.speed = this.player.baseSpeed + Math.max(speedBonus, percentSpeed);
        } else if (speedPenalty > 0 && speedBonus === 0) {
            // 只有雪天惩罚
            const percentPenalty = this.player.baseSpeed * speedPenaltyPercent;
            this.player.speed = this.player.baseSpeed - Math.max(speedPenalty, percentPenalty);
        } else if (speedBonus > 0 && speedPenalty > 0) {
            // 同时有加成和惩罚（虽然实际上不会同时发生）
            const percentSpeed = this.player.baseSpeed * speedBonusPercent;
            const percentPenalty = this.player.baseSpeed * speedPenaltyPercent;
            this.player.speed = this.player.baseSpeed + Math.max(speedBonus, percentSpeed) - Math.max(speedPenalty, percentPenalty);
        } else {
            // 无加成也无惩罚
            this.player.speed = this.player.baseSpeed;
        }

        // 应用晴天攻击加成
        const attackBonus = this.weatherSystem.getAttackBonus();
        const attackBonusPercent = this.weatherSystem.getAttackBonusPercent();
        if (attackBonus > 0) {
            const percentAttack = this.player.baseAttackPower * attackBonusPercent;
            this.player.attackPower = this.player.baseAttackPower + Math.max(attackBonus, percentAttack);
        } else {
            this.player.attackPower = this.player.baseAttackPower;
        }

        // 生成怪物
        this.spawnMonster(currentTime);

        // 获取虚拟摇杆输入
        let joystickInput = { x: 0, y: 0 };
        if (this.joystick && this.joystick.active) {
            joystickInput = this.joystick.getInput();
        }

        // 更新玩家
        this.player.update(deltaTime, this.keys, joystickInput);

        // 更新技能冷却和持续效果
        this.player.updateSkillCooldowns(deltaTime);

        // 更新回血阵
        this.updateHealFields(deltaTime);

        // 更新技能特效
        this.updateSkillEffects(deltaTime);

        // 更新怪物
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            const result = monster.update(this.player);

            // 处理自爆怪的自爆
            if (result && result.exploded) {
                // 播放自爆音效
                this.soundEffect.playMonsterDeath();

                // 创建自爆特效
                this.monsterExplosionEffects.push(this.monsterExplosionEffectPool.acquire(monster.x, monster.y, monster.size * 2));

                // 对范围内的所有单位造成伤害（包括玩家、其他怪物和Boss）
                
                // 1. 对玩家造成伤害
                const playerDistance = Utils.distance(monster.x, monster.y, this.player.x, this.player.y);
                if (playerDistance <= result.range) {
                    const actualDamage = this.player.takeDamage(result.damage);
                    this.playerHurtEffects.push(this.playerHurtEffectPool.acquire(this.player.x, this.player.y));

                    // 显示玩家受到的伤害数字（红色）
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, actualDamage, 'damage'));

                    if (this.player.hp <= 0) {
                        this.gameOver();
                        return;
                    }
                }

                // 2. 对其他怪物造成伤害（不分敌我）
                for (let j = this.monsters.length - 1; j >= 0; j--) {
                    if (i === j) continue; // 跳过自爆的怪物自己
                    const otherMonster = this.monsters[j];
                    const otherDistance = Utils.distance(monster.x, monster.y, otherMonster.x, otherMonster.y);
                    if (otherDistance <= result.range) {
                        const damageResult = otherMonster.takeDamage(result.damage);

                        // 显示伤害数字（紫色，表示友军伤害）
                        this.damageNumbers.push(this.damageNumberPool.acquire(otherMonster.x, otherMonster.y - otherMonster.size, damageResult.damage, 'skill'));

                        if (damageResult.killed) {
                            this.monsters.splice(j, 1);
                            this.redPackets.push(new RedPacket(otherMonster.x, otherMonster.y, this.isTouchDevice));
                            this.totalKills++;
                            this.score += 100;
                            // 修正索引，因为删除了一个元素
                            if (j < i) i--;
                        }
                    }
                }

                // 3. 对Boss造成伤害
                for (let j = this.bosses.length - 1; j >= 0; j--) {
                    const boss = this.bosses[j];
                    const bossDistance = Utils.distance(monster.x, monster.y, boss.x, boss.y);
                    if (bossDistance <= result.range) {
                        const damageResult = boss.takeDamage(result.damage);

                        // 显示伤害数字（紫色，表示友军伤害）
                        this.damageNumbers.push(this.damageNumberPool.acquire(boss.x, boss.y - boss.size, damageResult.damage, 'skill'));

                        if (damageResult.killed) {
                            // Boss掉落红包
                            for (let k = 0; k < boss.redpacketDropCount; k++) {
                                const angle = Math.random() * Math.PI * 2;
                                const dropDistance = Utils.randomRange(30, 80);
                                const dropX = boss.x + Math.cos(angle) * dropDistance;
                                const dropY = boss.y + Math.sin(angle) * dropDistance;
                                this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                            }
                            this.bosses.splice(j, 1);
                            this.totalKills++;
                            this.score += 500;
                        }
                    }
                }

                // 移除自爆的怪物
                this.monsters.splice(i, 1);
            }

            // 处理回复怪的回血
            if (result && result.heal) {
                // 播放治疗音效
                this.soundEffect.playCollect();

                // 对范围内的其他怪物回血（不包括自己）
                for (let j = this.monsters.length - 1; j >= 0; j--) {
                    if (i === j) continue; // 跳过自己
                    const otherMonster = this.monsters[j];
                    const otherDistance = Utils.distance(monster.x, monster.y, otherMonster.x, otherMonster.y);
                    if (otherDistance <= result.healRange) {
                        const healAmount = Math.floor(otherMonster.maxHp * result.healAmountPercent);
                        const oldHp = otherMonster.hp;
                        otherMonster.hp = Math.min(otherMonster.maxHp, otherMonster.hp + healAmount);
                        const actualHeal = otherMonster.hp - oldHp;

                        // 显示治疗数字（绿色）
                        if (actualHeal > 0) {
                            this.damageNumbers.push(this.damageNumberPool.acquire(otherMonster.x, otherMonster.y - otherMonster.size, actualHeal, 'heal'));
                        }
                    }
                }

                // 对Boss回血
                for (let j = this.bosses.length - 1; j >= 0; j--) {
                    const boss = this.bosses[j];
                    const bossDistance = Utils.distance(monster.x, monster.y, boss.x, boss.y);
                    if (bossDistance <= result.healRange) {
                        const healAmount = Math.floor(boss.maxHp * result.healAmountPercent);
                        const oldHp = boss.hp;
                        boss.hp = Math.min(boss.maxHp, boss.hp + healAmount);
                        const actualHeal = boss.hp - oldHp;

                        // 显示治疗数字（绿色）
                        if (actualHeal > 0) {
                            this.damageNumbers.push(this.damageNumberPool.acquire(boss.x, boss.y - boss.size, actualHeal, 'heal'));
                        }
                    }
                }
            }

            // 处理大盾怪的免伤
            if (result && result.shield) {
                // 对范围内的怪物（包括自己）添加免伤
                for (let j = this.monsters.length - 1; j >= 0; j--) {
                    const otherMonster = this.monsters[j];
                    const otherDistance = Utils.distance(monster.x, monster.y, otherMonster.x, otherMonster.y);
                    if (otherDistance <= result.shieldRange) {
                        otherMonster.hasShield = true;
                        otherMonster.shieldEndTime = Date.now() + result.shieldDuration;
                        otherMonster.shieldReduction = result.shieldReduction;
                    }
                }

                // 对Boss添加免伤
                for (let j = this.bosses.length - 1; j >= 0; j--) {
                    const boss = this.bosses[j];
                    const bossDistance = Utils.distance(monster.x, monster.y, boss.x, boss.y);
                    if (bossDistance <= result.shieldRange) {
                        boss.hasShield = true;
                        boss.shieldEndTime = Date.now() + result.shieldDuration;
                        boss.shieldReduction = result.shieldReduction;
                    }
                }
            }

            // 处理远程怪的弹道攻击
            if (result && result.shoot) {
                const projectile = new Projectile(
                    result.projectileX,
                    result.projectileY,
                    result.projectileSpeed,
                    result.projectileDamage,
                    result.projectileSize,
                    result.directionX,
                    result.directionY
                );
                this.projectiles.push(projectile);
            }
        }

        // 自动攻击逻辑
        if (this.settings.autoAttack && this.player.canAttack()) {
            // 检查攻击范围内是否有怪物或Boss
            const attackRadius = this.player.attackRange;
            let hasEnemyInRange = false;

            // 检查怪物
            for (const monster of this.monsters) {
                const distance = Utils.distance(this.player.x, this.player.y, monster.x, monster.y);
                if (distance <= attackRadius) {
                    hasEnemyInRange = true;
                    break;
                }
            }

            // 检查Boss
            if (!hasEnemyInRange) {
                for (const boss of this.bosses) {
                    const distance = Utils.distance(this.player.x, this.player.y, boss.x, boss.y);
                    if (distance <= attackRadius) {
                        hasEnemyInRange = true;
                        break;
                    }
                }
            }

            // 如果有敌人在范围内，自动攻击
            if (hasEnemyInRange) {
                this.executeAttack();
            }
        }

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
                    this.monsterExplosionEffects.push(this.monsterExplosionEffectPool.acquire(boss.x, boss.y, boss.size));

                    // 创建小马受伤特效
                    this.playerHurtEffects.push(this.playerHurtEffectPool.acquire(this.player.x, this.player.y));

                    // 玩家受到伤害
                    const actualDamage = this.player.takeDamage(result.damage);

                    // 显示玩家受到的伤害数字（红色）
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, actualDamage, 'damage'));

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

                // 显示玩家受到的伤害数字（红色）
                this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, damage, 'damage'));

                // 播放怪物自爆音效
                this.soundEffect.playMonsterDeath();

                // 创建怪物自爆特效
                this.monsterExplosionEffects.push(this.monsterExplosionEffectPool.acquire(monster.x, monster.y, monster.size));

                // 创建小马受伤特效
                this.playerHurtEffects.push(this.playerHurtEffectPool.acquire(this.player.x, this.player.y));

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

        // 更新回复包
        for (let i = this.healthPotions.length - 1; i >= 0; i--) {
            const potion = this.healthPotions[i];
            const result = potion.update(deltaTime, this.player);

            if (result.expired) {
                this.healthPotions.splice(i, 1);
            } else if (result.collected) {
                const oldHp = this.player.hp;
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + potion.healAmount);
                const actualHeal = this.player.hp - oldHp;

                // 只在实际回复血量时显示治疗数字（绿色）
                if (actualHeal > 0) {
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                }

                this.healthPotions.splice(i, 1);
                this.soundEffect.playCollect();
            }
        }

        // 更新弹道
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(deltaTime);

            // 检查弹道是否击中玩家
            if (projectile.checkHit(this.player)) {
                const actualDamage = this.player.takeDamage(projectile.damage);
                this.playerHurtEffects.push(this.playerHurtEffectPool.acquire(this.player.x, this.player.y));

                // 显示玩家受到的伤害数字（红色）
                this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, actualDamage, 'damage'));

                if (this.player.hp <= 0) {
                    this.gameOver();
                    return;
                }
            }

            // 移除不活跃的弹道
            if (!projectile.active) {
                this.projectiles.splice(i, 1);
            }
        }

        // 更新雷击效果
        for (let i = this.lightningEffects.length - 1; i >= 0; i--) {
            const lightning = this.lightningEffects[i];
            lightning.update(deltaTime);

            // 检查雷击是否击中玩家
            if (lightning.hasStruck && lightning.checkHit(this.player)) {
                const actualDamage = this.player.takeDamage(lightning.damage);
                this.playerHurtEffects.push(this.playerHurtEffectPool.acquire(this.player.x, this.player.y));

                // 显示玩家受到的伤害数字（红色）
                this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, actualDamage, 'damage'));

                if (this.player.hp <= 0) {
                    this.gameOver();
                    return;
                }
            }

            // 检查雷击是否击中怪物
            for (let j = this.monsters.length - 1; j >= 0; j--) {
                const monster = this.monsters[j];
                if (lightning.checkHit(monster)) {
                    const result = monster.takeDamage(lightning.damage);

                    // 显示技能伤害数字（紫色）
                    this.damageNumbers.push(this.damageNumberPool.acquire(monster.x, monster.y - monster.size, result.damage, 'skill'));

                    // 嗜血术吸血效果
                    if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                        const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                        const lifestealPercent = skillConfig.baseLifestealBonus;
                        const healAmount = result.damage * lifestealPercent;

                        // 只在实际回复血量时显示
                        const oldHp = this.player.hp;
                        this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                        const actualHeal = this.player.hp - oldHp;

                        if (actualHeal > 0) {
                            this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                        }
                    }

                    if (result.killed) {
                        const monster = this.monsters[j];
                        this.monsters.splice(j, 1);
                        
                        // 精英怪掉落多个红包
                        const dropCount = monster.isElite ? monster.redpacketDropCount : 1;
                        for (let k = 0; k < dropCount; k++) {
                            const angle = Math.random() * Math.PI * 2;
                            const dropDistance = Utils.randomRange(30, 80);
                            const dropX = monster.x + Math.cos(angle) * dropDistance;
                            const dropY = monster.y + Math.sin(angle) * dropDistance;
                            this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                        }
                        
                        this.totalKills++;
                        this.score += monster.isElite ? 300 : 100;
                        this.soundEffect.playMonsterDeath();
                    }
                }
            }

            // 检查雷击是否击中Boss
            for (let j = this.bosses.length - 1; j >= 0; j--) {
                const boss = this.bosses[j];
                if (lightning.checkHit(boss)) {
                    const result = boss.takeDamage(lightning.damage);

                    // 显示技能伤害数字（紫色）
                    this.damageNumbers.push(this.damageNumberPool.acquire(boss.x, boss.y - boss.size, result.damage, 'skill'));

                    // 嗜血术吸血效果
                    if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                        const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                        const lifestealPercent = skillConfig.baseLifestealBonus;
                        const healAmount = result.damage * lifestealPercent;

                        // 只在实际回复血量时显示
                        const oldHp = this.player.hp;
                        this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                        const actualHeal = this.player.hp - oldHp;

                        if (actualHeal > 0) {
                            this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                        }
                    }

                    if (result.killed) {
                        for (let k = 0; k < boss.redpacketDropCount; k++) {
                            const angle = Math.random() * Math.PI * 2;
                            const dropDistance = Utils.randomRange(30, 80);
                            const dropX = boss.x + Math.cos(angle) * dropDistance;
                            const dropY = boss.y + Math.sin(angle) * dropDistance;
                            this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                        }
                        this.bosses.splice(j, 1);
                        this.totalKills++;
                        this.score += 500;
                        this.soundEffect.playMonsterDeath();
                    }
                }
            }

            if (!lightning.active) {
                this.lightningEffectPool.release(this.lightningEffects[i]);
                this.lightningEffects.splice(i, 1);
            }
        }

        // 更新攻击效果
        for (let i = this.attackEffects.length - 1; i >= 0; i--) {
            const effect = this.attackEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.attackEffectPool.release(effect);
                this.attackEffects.splice(i, 1);
            }
        }

        // 更新怪物自爆特效
        for (let i = this.monsterExplosionEffects.length - 1; i >= 0; i--) {
            const effect = this.monsterExplosionEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.monsterExplosionEffectPool.release(effect);
                this.monsterExplosionEffects.splice(i, 1);
            }
        }

        // 更新小马受伤特效
        for (let i = this.playerHurtEffects.length - 1; i >= 0; i--) {
            const effect = this.playerHurtEffects[i];
            effect.update(deltaTime);

            if (!effect.active) {
                this.playerHurtEffectPool.release(effect);
                this.playerHurtEffects.splice(i, 1);
            }
        }

        // 更新伤害数字
        for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
            const number = this.damageNumbers[i];
            number.update(deltaTime);

            if (!number.active) {
                this.damageNumberPool.release(number);
                this.damageNumbers.splice(i, 1);
            }
        }

        // 更新UI
        this.updateUI();
        
        // 渲染
        this.render();
        
        // 继续循环
        this.gameLoopRequestId = requestAnimationFrame(() => this.gameLoop());
    }
    
    showUpgradeScreen() {
        this.state = GameState.PAUSED;
        document.getElementById('upgradeScreen').classList.remove('hidden');
        document.getElementById('currentLevel').textContent = this.player.level;

        // 生成技能升级选项
        const skillOptions = this.generateSkillUpgradeOptions();
        this.renderSkillUpgradeOptions(skillOptions);
    }

    // ==================== 技能系统方法 ====================

    // 生成3个技能升级选项
    generateSkillUpgradeOptions() {
        const learnedSkills = Object.keys(this.player.playerSkills.learned);
        const allSkills = Object.keys(CONFIG.SKILL.POOL);
        const maxSkills = CONFIG.SKILL.MAX_SKILLS;

        const options = [];
        const selected = new Set();

        // 如果已学满，只返回已学技能的升级选项
        if (learnedSkills.length >= maxSkills) {
            // 随机选择已学技能
            const shuffled = [...learnedSkills].sort(() => Math.random() - 0.5);
            options.push(...shuffled.slice(0, Math.min(3, shuffled.length)));
        } else {
            // 计算需要多少新技能和多少升级选项
            const newSkillCount = Math.min(3, maxSkills - learnedSkills.length);
            const upgradeCount = 3 - newSkillCount;

            // 选择未学技能
            const unlearned = allSkills.filter(s => !learnedSkills.includes(s));
            if (unlearned.length > 0) {
                const shuffled = [...unlearned].sort(() => Math.random() - 0.5);
                options.push(...shuffled.slice(0, newSkillCount));
            }

            // 选择已学技能升级
            if (upgradeCount > 0 && learnedSkills.length > 0) {
                const shuffled = [...learnedSkills].sort(() => Math.random() - 0.5);
                options.push(...shuffled.slice(0, upgradeCount));
            }
        }

        // 确保返回3个选项
        const finalOptions = options.slice(0, 3);
        return finalOptions;
    }

    // 获取技能详细描述
    getSkillDescription(skillId, currentLevel = 0) {
        const skillConfig = CONFIG.SKILL.POOL[skillId];
        if (!skillConfig) return '';

        const isNew = currentLevel === 0;
        const nextLevel = currentLevel + 1;

        let description = `<div class="skill-description">${skillConfig.description}</div>`;

        // 显示基础属性
        const stats = [];
        if (skillConfig.baseCooldown) {
            stats.push(`冷却: ${skillConfig.baseCooldown / 1000}秒`);
        }
        if (skillConfig.baseDuration) {
            stats.push(`持续: ${skillConfig.baseDuration / 1000}秒`);
        }
        if (skillConfig.baseSpeedBonus) {
            stats.push(`移速+${Math.round(skillConfig.baseSpeedBonus * 100)}%`);
        }
        if (skillConfig.baseAttackSpeedBonus) {
            stats.push(`攻速+${Math.round(skillConfig.baseAttackSpeedBonus * 100)}%`);
        }
        if (skillConfig.baseDefenseBonus) {
            stats.push(`防御+${Math.round(skillConfig.baseDefenseBonus * 100)}%`);
        }
        if (skillConfig.baseHealPercent) {
            stats.push(`回复${Math.round(skillConfig.baseHealPercent * 100)}%血量`);
        }
        if (skillConfig.baseDamagePercent) {
            // 天罚技能不显示具体数值
            if (skillId === 'skyPunishment') {
                stats.push(`造成大量伤害`);
            } else {
                stats.push(`造成${Math.round(skillConfig.baseDamagePercent * 100)}%血量伤害`);
            }
        }
        if (skillConfig.baseRadius) {
            stats.push(`范围: ${skillConfig.baseRadius}`);
        }
        if (skillConfig.baseLifestealBonus) {
            stats.push(`吸血+${Math.round(skillConfig.baseLifestealBonus * 100)}%`);
        }
        if (skillConfig.baseDistance) {
            stats.push(`距离: ${skillConfig.baseDistance}`);
        }

        if (stats.length > 0) {
            description += `<div class="skill-stats">${stats.join(' | ')}</div>`;
        }

        // 显示升级内容
        if (!isNew && skillConfig.levelEffects) {
            const upgrades = [];
            for (const [key, value] of Object.entries(skillConfig.levelEffects)) {
                if (key === 'duration') {
                    upgrades.push(`持续时间+${value / 1000}秒`);
                } else if (key === 'healPercent') {
                    upgrades.push(`回复+${Math.round(value * 100)}%`);
                } else if (key === 'healPercentPerSecond') {
                    upgrades.push(`每秒回复+${Math.round(value * 100)}%`);
                } else if (key === 'maxDamageMultiplier') {
                    upgrades.push(`伤害上限+${value}倍`);
                } else if (key === 'cooldown') {
                    upgrades.push(`冷却-${value / 1000}秒`);
                } else if (key === 'damagePercent') {
                    // 天罚技能升级效果描述
                    if (skillId === 'skyPunishment') {
                        upgrades.push(`增加1%伤害比例`);
                    } else {
                        upgrades.push(`伤害+${Math.round(value * 100)}%`);
                    }
                }
            }
            if (upgrades.length > 0) {
                description += `<div class="skill-upgrade-info">升级: ${upgrades.join(' | ')}</div>`;
            }
        }

        return description;
    }

    // 渲染技能升级选项
    renderSkillUpgradeOptions(skillOptions) {
        const container = document.getElementById('skillUpgradeOptions');
        if (!container) return;

        container.innerHTML = '';

        skillOptions.forEach(skillId => {
            const isLearned = this.player.playerSkills.learned[skillId];
            const skillConfig = CONFIG.SKILL.POOL[skillId];
            const level = isLearned || 0;

            const button = document.createElement('button');
            button.className = 'skill-upgrade-option';
            button.dataset.skill = skillId;
            button.innerHTML = `
                <span class="skill-upgrade-icon">${skillConfig.icon}</span>
                <span class="skill-upgrade-name">${skillConfig.name}</span>
                <span class="skill-upgrade-level">${isLearned ? `Lv.${level}` : '新技能'}</span>
                ${this.getSkillDescription(skillId, level)}
            `;

            container.appendChild(button);
        });

        // 使用事件委托，避免重复添加监听器
        container.onSkillButtonClick = (e) => {
            const button = e.target.closest('.skill-upgrade-option');
            if (button) {
                const skillId = button.dataset.skill;
                // 移除事件监听器，防止重复调用
                container.removeEventListener('click', container.onSkillButtonClick);
                this.handleSkillUpgradeChoice(skillId);
            }
        };

        container.addEventListener('click', container.onSkillButtonClick);
    }

    // 处理技能升级选择
    handleSkillUpgradeChoice(skillId) {
        // 升级玩家（扣除经验，更新等级和下一级所需经验）
        this.player.levelUp();

        const isLearned = this.player.playerSkills.learned[skillId];

        if (isLearned) {
            // 升级现有技能
            this.player.upgradeSkill(skillId);
        } else {
            // 学习新技能
            this.player.unlockSkill(skillId);
        }

        // 隐藏升级界面
        document.getElementById('upgradeScreen').classList.add('hidden');
        this.state = GameState.PLAYING;

        // 重置时间以避免deltaTime过大
        this.lastTime = performance.now();
        
        // 启动游戏循环
        this.gameLoop();
    }

    // 处理技能使用
    handleSkillUse(skillId) {
        if (!this.player.canUseSkill(skillId)) return;

        // 使用技能
        const healAmount = this.player.useSkill(skillId);

        // 获取技能属性
        const stats = this.player.getSkillStats(skillId);
        if (!stats) return;

        // 应用技能效果
        this.applySkillEffect(skillId, stats, healAmount);

        // 播放技能音效
        this.soundEffect.playSkillEffect(skillId);
    }

    // 应用技能效果
    applySkillEffect(skillId, stats, healAmount = 0) {
        const skillConfig = CONFIG.SKILL.POOL[skillId];

        switch (skillId) {
            case 'fleetFoot':
            case 'frenzy':
            case 'stoneSkin':
            case 'bloodthirst':
                // 持续效果已经在Player.useSkill中处理
                break;

            case 'heal':
                // 立即回血效果已经在Player.useSkill中处理
                // 只在实际回复血量时显示治疗数字（绿色）
                if (healAmount > 0) {
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(healAmount), 'heal'));
                }

                // 创建特效
                this.skillEffects.push({
                    type: 'heal',
                    x: this.player.x,
                    y: this.player.y,
                    duration: 1000,
                    elapsed: 0,
                    active: true
                });
                break;

            case 'skyPunishment':
                // 天罚：对全屏敌人造成伤害
                this.applySkyPunishment(stats);
                break;

            case 'healField':
                // 创建回血阵
                this.healFields.push({
                    x: this.player.x,
                    y: this.player.y,
                    radius: stats.radius,
                    duration: stats.duration,
                    elapsed: 0,
                    healPercentPerSecond: stats.healPercentPerSecond,
                    active: true
                });
                break;

            case 'blink':
                // 闪现效果
                this.skillEffects.push({
                    type: 'blink',
                    x: this.player.x,
                    y: this.player.y,
                    duration: 500,
                    elapsed: 0,
                    active: true
                });
                break;
        }
    }

    // 应用天罚效果
    applySkyPunishment(stats) {
        const finalDamage = this.player.maxHp * stats.damagePercent;

        // 对所有怪物造成伤害
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            const result = monster.takeDamage(finalDamage);

            // 显示技能伤害数字（紫色）
            this.damageNumbers.push(this.damageNumberPool.acquire(monster.x, monster.y - monster.size, result.damage, 'skill'));

            // 嗜血术吸血效果
            if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                const lifestealPercent = skillConfig.baseLifestealBonus;
                const healAmount = result.damage * lifestealPercent;

                // 只在实际回复血量时显示
                const oldHp = this.player.hp;
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                const actualHeal = this.player.hp - oldHp;

                if (actualHeal > 0) {
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                }
            }

            if (result.killed) {
                const monster = this.monsters[i];
                this.monsters.splice(i, 1);
                
                // 精英怪掉落多个红包
                const dropCount = monster.isElite ? monster.redpacketDropCount : 1;
                for (let k = 0; k < dropCount; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dropDistance = Utils.randomRange(30, 80);
                    const dropX = monster.x + Math.cos(angle) * dropDistance;
                    const dropY = monster.y + Math.sin(angle) * dropDistance;
                    this.redPackets.push(new RedPacket(dropX, dropY, this.isTouchDevice));
                }
                
                this.totalKills++;
                this.score += monster.isElite ? 300 : 100;
                this.soundEffect.playMonsterDeath();
            }
        }

        // 对所有Boss造成伤害
        for (let i = this.bosses.length - 1; i >= 0; i--) {
            const boss = this.bosses[i];
            const result = boss.takeDamage(finalDamage);

            // 显示技能伤害数字（紫色）
            this.damageNumbers.push(this.damageNumberPool.acquire(boss.x, boss.y - boss.size, result.damage, 'skill'));

            // 嗜血术吸血效果
            if (this.player.playerSkills.effects.bloodthirst.active && result.damage > 0) {
                const skillConfig = CONFIG.SKILL.POOL.bloodthirst;
                const lifestealPercent = skillConfig.baseLifestealBonus;
                const healAmount = result.damage * lifestealPercent;

                // 只在实际回复血量时显示
                const oldHp = this.player.hp;
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                const actualHeal = this.player.hp - oldHp;

                if (actualHeal > 0) {
                    this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(actualHeal), 'heal'));
                }
            }

            if (result.killed) {
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
                this.soundEffect.playMonsterDeath();
            }
        }

        // 创建全屏闪电特效
        this.skillEffects.push({
            type: 'skyPunishment',
            duration: 1500,
            elapsed: 0,
            active: true
        });
    }

    // 更新回血阵
    updateHealFields(deltaTime) {
        for (let i = this.healFields.length - 1; i >= 0; i--) {
            const field = this.healFields[i];
            field.elapsed += deltaTime;

            // 检查玩家是否在回血阵范围内
            const distance = Utils.distance(this.player.x, this.player.y, field.x, field.y);
            if (distance <= field.radius) {
                // 每秒回复生命值
                const healPerSecond = this.player.maxHp * field.healPercentPerSecond;
                const healAmount = healPerSecond * (deltaTime / 1000);

                // 累计回复量
                if (!field.accumulatedHeal) {
                    field.accumulatedHeal = 0;
                }

                const oldHp = this.player.hp;
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                field.accumulatedHeal += (this.player.hp - oldHp);

                // 显示治疗数字（每秒显示一次累计值）
                if (!field.lastHealDisplayTime) {
                    field.lastHealDisplayTime = 0;
                }
                if (Date.now() - field.lastHealDisplayTime >= 1000) {
                    if (field.accumulatedHeal > 0) {
                        this.damageNumbers.push(this.damageNumberPool.acquire(this.player.x, this.player.y - this.player.size, Math.floor(field.accumulatedHeal), 'heal'));
                    }
                    field.accumulatedHeal = 0;  // 清零累计值
                    field.lastHealDisplayTime = Date.now();
                }
            }

            // 检查回血阵是否过期
            if (field.elapsed >= field.duration) {
                this.healFields.splice(i, 1);
            }
        }
    }

    // 更新技能特效
    updateSkillEffects(deltaTime) {
        for (let i = this.skillEffects.length - 1; i >= 0; i--) {
            const effect = this.skillEffects[i];
            effect.elapsed += deltaTime;

            if (effect.elapsed >= effect.duration) {
                effect.active = false;
                this.skillEffects.splice(i, 1);
            }
        }
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
        // 使用深拷贝来确保所有嵌套对象都被正确重置
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings();
        // 更新UI显示
        this.syncSettingsToUI();
        // 更新全局设置
        window.gameSettings = this.settings;
        // 更新Player的gameSettings引用
        if (this.player) {
            this.player.gameSettings = this.settings;
        }
    }

    // 处理标签页切换
    handleTabSwitch(e) {
        const clickedTab = e.currentTarget;
        const tabId = clickedTab.dataset.tab;

        // 移除所有标签页的active类
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // 隐藏所有标签页内容
        document.querySelectorAll('.settings-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // 激活当前点击的标签页
        clickedTab.classList.add('active');

        // 显示对应的标签页内容
        const tabContent = document.getElementById(`tab-${tabId}`);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    }

    // 处理按键绑定点击
    handleKeybindClick(e) {
        const button = e.currentTarget;
        const keyId = button.dataset.key;

        // 如果已经在监听按键，取消监听
        if (this.isListeningForKeybind) {
            this.stopKeybindListening();
            return;
        }

        // 开始监听按键
        this.startKeybindListening(button, keyId);
    }

    // 开始监听按键
    startKeybindListening(button, keyId) {
        this.isListeningForKeybind = true;
        this.currentKeybindButton = button;
        this.currentKeyId = keyId;

        // 添加listening类
        button.classList.add('listening');
        button.textContent = '按键...';

        // 添加按键监听器
        this.keybindHandler = (e) => this.handleKeyPress(e);
        window.addEventListener('keydown', this.keybindHandler);
    }

    // 停止监听按键
    stopKeybindListening() {
        if (!this.isListeningForKeybind) return;

        this.isListeningForKeybind = false;

        // 移除listening类
        if (this.currentKeybindButton) {
            this.currentKeybindButton.classList.remove('listening');
            this.currentKeybindButton.textContent = this.getKeyDisplayName(this.settings.keyBindings[this.currentKeyId]);
        }

        // 移除按键监听器
        if (this.keybindHandler) {
            window.removeEventListener('keydown', this.keybindHandler);
            this.keybindHandler = null;
        }

        this.currentKeybindButton = null;
        this.currentKeyId = null;
    }

    // 处理按键
    handleKeyPress(e) {
        e.preventDefault();

        // 获取按键代码
        let keyCode = e.code;

        // 检查是否是有效按键
        if (this.isValidKey(keyCode)) {
            // 检查是否与其他按键冲突
            const existingKeyId = this.findKeyByCode(keyCode);
            if (existingKeyId && existingKeyId !== this.currentKeyId) {
                // 按键冲突，不允许绑定
                alert('该按键已被使用！');
                this.stopKeybindListening();
                return;
            }

            // 保存按键绑定
            this.settings.keyBindings[this.currentKeyId] = keyCode;
            this.saveSettings();

            // 更新Player的gameSettings引用，确保按键绑定立即生效
            if (this.player) {
                this.player.gameSettings = this.settings;
            }

            // 更新按钮显示
            this.currentKeybindButton.textContent = this.getKeyDisplayName(keyCode);
            this.stopKeybindListening();
        } else {
            // 无效按键
            alert('请使用有效的按键！');
        }
    }

    // 检查按键是否有效
    isValidKey(code) {
        // 排除一些特殊按键
        const invalidKeys = [
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
            'Escape', 'PrintScreen', 'ScrollLock', 'Pause',
            'ContextMenu', 'NumLock', 'CapsLock'
        ];

        if (invalidKeys.includes(code)) return false;

        // 只允许字母、数字和方向键
        return /^(Key|Digit|Arrow|Space)/.test(code);
    }

    // 根据按键代码查找对应的按键ID
    findKeyByCode(code) {
        for (const [keyId, keyCode] of Object.entries(this.settings.keyBindings)) {
            if (keyCode === code) return keyId;
        }
        return null;
    }

    // 获取按键显示名称
    getKeyDisplayName(code) {
        if (code === 'mouse') return '鼠标左键';

        const keyNames = {
            'KeyW': 'W', 'KeyA': 'A', 'KeyS': 'S', 'KeyD': 'D',
            'KeyQ': 'Q', 'KeyE': 'E', 'KeyR': 'R', 'KeyF': 'F',
            'ArrowUp': '↑', 'ArrowDown': '↓', 'ArrowLeft': '←', 'ArrowRight': '→',
            'Space': '空格',
            'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
            'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0'
        };

        return keyNames[code] || code;
    }

    // 同步按键绑定到UI
    syncKeybindsToUI() {
        const bindings = this.settings.keyBindings || {};
        for (const [keyId, keyCode] of Object.entries(bindings)) {
            const button = document.getElementById(`keybind-${keyId}`);
            if (button) {
                button.textContent = this.getKeyDisplayName(keyCode);
            }
        }
    }

    // 同步移动端按钮位置到UI
    syncMobileButtonsToUI() {
        const positions = this.settings.mobileButtonPositions || {};
        const joystickSelect = document.getElementById('joystickPosition');
        const attackButtonSelect = document.getElementById('attackButtonPosition');

        if (joystickSelect) {
            joystickSelect.value = positions.joystick || 'left';
        }
        if (attackButtonSelect) {
            attackButtonSelect.value = positions.attackButton || 'right';
        }
    }

    // 渲染质量预设定义
    getQualityPresets() {
        return {
            auto: {
                effectQuality: 'high',
                shadowQuality: 'medium',
                damageNumberQuality: 'high',
                animationQuality: 'high',
                particleQuality: 'medium'
            },
            high: {
                effectQuality: 'high',
                shadowQuality: 'high',
                damageNumberQuality: 'high',
                animationQuality: 'high',
                particleQuality: 'high'
            },
            medium: {
                effectQuality: 'medium',
                shadowQuality: 'medium',
                damageNumberQuality: 'medium',
                animationQuality: 'medium',
                particleQuality: 'medium'
            },
            low: {
                effectQuality: 'low',
                shadowQuality: 'low',
                damageNumberQuality: 'low',
                animationQuality: 'low',
                particleQuality: 'low'
            }
        };
    }

    // 处理渲染质量预设变化
    handleRenderQualityPresetChange(preset) {
        // 如果当前是自定义模式且切换到其他预设，先从UI读取当前值再保存
        if (this.settings.renderQualityPreset === 'custom' && preset !== 'custom') {
            // 先从UI读取当前值更新到 settings
            this.settings.qualitySettings = {
                effectQuality: document.getElementById('effectQuality').value || 'high',
                shadowQuality: document.getElementById('shadowQuality').value || 'high',
                damageNumberQuality: document.getElementById('damageNumberQuality').value || 'high',
                animationQuality: document.getElementById('animationQuality').value || 'high',
                particleQuality: document.getElementById('particleQuality').value || 'high'
            };
            // 再保存自定义设置
            this.customQualitySettings = { ...this.settings.qualitySettings };
        }

        this.settings.renderQualityPreset = preset;

        if (preset === 'custom') {
            // 启用所有详细设置
            this.enableQualitySettings(true);
            
            // 恢复之前保存的自定义设置
            this.settings.qualitySettings = { ...this.customQualitySettings };
        } else {
            // 禁用所有详细设置
            this.enableQualitySettings(false);

            // 根据预设更新详细设置
            const presets = this.getQualityPresets();
            if (presets[preset]) {
                this.settings.qualitySettings = { ...presets[preset] };
            }
        }
        
        // 同步UI
        this.syncQualitySettingsToUI();
    }

    // 启用/禁用详细质量设置
    enableQualitySettings(enable) {
        const qualitySettings = document.querySelectorAll('.quality-setting');
        qualitySettings.forEach(setting => {
            if (enable) {
                setting.disabled = false;
                setting.classList.remove('disabled');
            } else {
                setting.disabled = true;
                setting.classList.add('disabled');
            }
        });
    }

    // 同步质量设置到UI
    syncQualitySettingsToUI() {
        const qualitySettings = this.settings.qualitySettings || {};
        document.getElementById('effectQuality').value = qualitySettings.effectQuality || 'high';
        document.getElementById('shadowQuality').value = qualitySettings.shadowQuality || 'high';
        document.getElementById('damageNumberQuality').value = qualitySettings.damageNumberQuality || 'high';
        document.getElementById('animationQuality').value = qualitySettings.animationQuality || 'high';
        document.getElementById('particleQuality').value = qualitySettings.particleQuality || 'high';
    }

    syncSettingsToUI() {
        // 同步视觉设置
        document.getElementById('showAttackRange').checked = this.settings.showAttackRange;
        document.getElementById('showCollectRange').checked = this.settings.showCollectRange;
        document.getElementById('autoAttack').checked = this.settings.autoAttack;
        document.getElementById('showSkillCooldown').checked = this.settings.showSkillCooldown;
        document.getElementById('showDamageNumbers').checked = this.settings.showDamageNumbers;

        // 同步渲染质量预设
        document.getElementById('renderQualityPreset').value = this.settings.renderQualityPreset || 'auto';

        // 根据预设启用/禁用详细设置
        const isCustom = this.settings.renderQualityPreset === 'custom';
        this.enableQualitySettings(isCustom);

        // 同步质量设置
        // 如果是自定义模式，使用保存的自定义设置
        if (isCustom) {
            this.settings.qualitySettings = { ...this.customQualitySettings };
        }
        this.syncQualitySettingsToUI();

        // 同步按键绑定
        this.syncKeybindsToUI();

        // 同步移动端按钮位置
        this.syncMobileButtonsToUI();

        // 同步红包设置
        document.getElementById('redpacketExpValue').value = this.settings.redpacketExpValue;

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

        // 同步精英怪基础数值
        document.getElementById('eliteHpMultiplier').value = this.settings.eliteHpMultiplier;
        document.getElementById('eliteAttackMultiplier').value = this.settings.eliteAttackMultiplier;
        document.getElementById('eliteSpeedMultiplier').value = this.settings.eliteSpeedMultiplier;
        document.getElementById('eliteSizeMultiplier').value = this.settings.eliteSizeMultiplier;
        document.getElementById('eliteRedpacketDropCount').value = this.settings.eliteRedpacketDropCount;

        // 同步精英怪技能参数
        document.getElementById('healerInterval').value = this.settings.healerInterval;
        document.getElementById('healerRange').value = this.settings.healerRange;
        document.getElementById('healerAmountPercent').value = this.settings.healerAmountPercent;
        document.getElementById('shielderInterval').value = this.settings.shielderInterval;
        document.getElementById('shielderRange').value = this.settings.shielderRange;
        document.getElementById('shielderDuration').value = this.settings.shielderDuration;
        document.getElementById('shielderReduction').value = this.settings.shielderReduction;
        document.getElementById('rangedAttackInterval').value = this.settings.rangedAttackInterval;
        document.getElementById('rangedAttackRange').value = this.settings.rangedAttackRange;
        document.getElementById('rangedProjectileSpeed').value = this.settings.rangedProjectileSpeed;
        document.getElementById('rangedProjectileDamage').value = this.settings.rangedProjectileDamage;
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

        // 更新Player的gameSettings引用，确保按键绑定立即生效
        if (this.player) {
            this.player.gameSettings = this.settings;
        }

        document.getElementById('settingsScreen').classList.add('hidden');

        // 检查是否是从暂停界面打开的设置
        // 如果玩家活着且游戏处于暂停状态，返回暂停界面
        if (this.player && this.player.hp > 0 && this.state === GameState.PAUSED) {
            this.showPauseScreen();
        }
        // 如果游戏正在进行，恢复游戏
        else if (this.player && this.player.hp > 0) {
            this.state = GameState.PLAYING;

            // 重置时间以避免deltaTime过大
            this.lastTime = performance.now();

            // 启动游戏循环
            this.gameLoop();
        }
    }

    readSettingsFromUI() {
        // 读取视觉设置
        this.settings.showAttackRange = document.getElementById('showAttackRange').checked;
        this.settings.showCollectRange = document.getElementById('showCollectRange').checked;
        this.settings.autoAttack = document.getElementById('autoAttack').checked;
        this.settings.showSkillCooldown = document.getElementById('showSkillCooldown').checked;
        this.settings.showDamageNumbers = document.getElementById('showDamageNumbers').checked;

        // 读取渲染质量预设
        this.settings.renderQualityPreset = document.getElementById('renderQualityPreset').value || 'auto';

        // 如果是自定义，读取详细设置
        if (this.settings.renderQualityPreset === 'custom') {
            this.settings.qualitySettings = {
                effectQuality: document.getElementById('effectQuality').value || 'high',
                shadowQuality: document.getElementById('shadowQuality').value || 'high',
                damageNumberQuality: document.getElementById('damageNumberQuality').value || 'high',
                animationQuality: document.getElementById('animationQuality').value || 'high',
                particleQuality: document.getElementById('particleQuality').value || 'high'
            };
            // 同时更新自定义设置保存
            this.customQualitySettings = { ...this.settings.qualitySettings };
        }

        // 读取移动端按钮位置
        const joystickPosition = document.getElementById('joystickPosition');
        const attackButtonPosition = document.getElementById('attackButtonPosition');
        if (joystickPosition) {
            this.settings.mobileButtonPositions.joystick = joystickPosition.value || 'left';
        }
        if (attackButtonPosition) {
            this.settings.mobileButtonPositions.attackButton = attackButtonPosition.value || 'right';
        }

        // 读取红包设置
        this.settings.redpacketExpValue = parseInt(document.getElementById('redpacketExpValue').value) || 10;

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
        this.settings.monsterSpeedGrowth = parseFloat(document.getElementById('monsterSpeedGrowth').value) || 0.01;

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

        // 读取精英怪基础数值
        this.settings.eliteHpMultiplier = parseFloat(document.getElementById('eliteHpMultiplier').value) || 1.5;
        this.settings.eliteAttackMultiplier = parseFloat(document.getElementById('eliteAttackMultiplier').value) || 0.5;
        this.settings.eliteSpeedMultiplier = parseFloat(document.getElementById('eliteSpeedMultiplier').value) || 1.0;
        this.settings.eliteSizeMultiplier = parseFloat(document.getElementById('eliteSizeMultiplier').value) || 1.1;
        this.settings.eliteRedpacketDropCount = parseInt(document.getElementById('eliteRedpacketDropCount').value) || 6;

        // 读取精英怪技能参数
        this.settings.healerInterval = parseInt(document.getElementById('healerInterval').value) || 5000;
        this.settings.healerRange = parseInt(document.getElementById('healerRange').value) || 200;
        this.settings.healerAmountPercent = parseFloat(document.getElementById('healerAmountPercent').value) || 0.2;
        this.settings.shielderInterval = parseInt(document.getElementById('shielderInterval').value) || 6000;
        this.settings.shielderRange = parseInt(document.getElementById('shielderRange').value) || 180;
        this.settings.shielderDuration = parseInt(document.getElementById('shielderDuration').value) || 2000;
        this.settings.shielderReduction = parseFloat(document.getElementById('shielderReduction').value) || 0.5;
        this.settings.rangedAttackInterval = parseInt(document.getElementById('rangedAttackInterval').value) || 2000;
        this.settings.rangedAttackRange = parseInt(document.getElementById('rangedAttackRange').value) || 200;
        this.settings.rangedProjectileSpeed = parseFloat(document.getElementById('rangedProjectileSpeed').value) || 4;
        this.settings.rangedProjectileDamage = parseInt(document.getElementById('rangedProjectileDamage').value) || 15;
    }

    // ==================== 图鉴系统方法 ====================

    /**
     * 打开图鉴
     */
    openBestiary() {
        // 如果在游戏中，暂停游戏
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
        }

        document.getElementById('bestiaryScreen').classList.remove('hidden');
        this.renderBestiaryGrid();
    }

    /**
     * 关闭图鉴
     */
    closeBestiary() {
        document.getElementById('bestiaryScreen').classList.add('hidden');
        document.getElementById('monsterDetail').classList.remove('active');
        document.getElementById('bestiaryGrid').style.display = 'grid';

        // 如果游戏处于暂停状态，返回游戏或暂停界面
        if (this.player && this.player.hp > 0 && this.state === GameState.PAUSED) {
            this.showPauseScreen();
        }
    }

    /**
     * 渲染图鉴网格
     */
    renderBestiaryGrid() {
        const grid = document.getElementById('bestiaryGrid');
        grid.innerHTML = '';

        // 添加所有怪物
        Object.values(BESTIARY.monsters).forEach(monster => {
            const card = document.createElement('div');
            card.className = 'monster-card';
            card.style.borderColor = monster.color;
            card.innerHTML = `
                <div style="position: relative;">
                    <span class="monster-card-icon">${monster.emoji}</span>
                    ${monster.badge ? `<span class="monster-card-badge">${monster.badge}</span>` : ''}
                </div>
                <div class="monster-card-name">${monster.name}</div>
                <div class="monster-card-type">${monster.isElite ? '精英怪' : '普通怪'}</div>
            `;
            card.addEventListener('click', () => this.showMonsterDetail(monster));
            grid.appendChild(card);
        });

        // 添加Boss
        const bossCard = document.createElement('div');
        bossCard.className = 'monster-card';
        bossCard.style.borderColor = BESTIARY.boss.color;
        bossCard.innerHTML = `
            <div style="position: relative;">
                <span class="monster-card-icon">${BESTIARY.boss.emoji}</span>
                <span class="monster-card-badge">${BESTIARY.boss.badge}</span>
            </div>
            <div class="monster-card-name">${BESTIARY.boss.name}</div>
            <div class="monster-card-type">Boss</div>
        `;
        bossCard.addEventListener('click', () => this.showMonsterDetail(BESTIARY.boss));
        grid.appendChild(bossCard);
    }

    /**
     * 显示怪物详情
     */
    showMonsterDetail(monster) {
        document.getElementById('bestiaryGrid').style.display = 'none';
        document.getElementById('monsterDetail').classList.add('active');

        // 显示怪物名称
        document.getElementById('monsterName').textContent = monster.name;

        // 显示标签
        const tagsContainer = document.getElementById('monsterTags');
        tagsContainer.innerHTML = '';
        monster.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = `monster-tag ${monster.isElite ? 'elite' : ''}`;
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });

        // 显示描述
        document.getElementById('monsterDescription').innerHTML = `
            <p>${monster.description}</p>
            ${monster.ability ? `<p style="color: var(--accent-gold); margin-top: 10px;"><strong>特殊能力：</strong>${monster.ability}</p>` : ''}
        `;

        // 显示特性
        const statsContainer = document.getElementById('monsterStats');
        statsContainer.innerHTML = '';
        Object.values(monster.stats).forEach(stat => {
            const statEl = document.createElement('div');
            statEl.className = 'stat-item';
            statEl.innerHTML = `
                <span class="stat-label">${stat.label}：</span>
                <span class="stat-value ${stat.class}">${stat.value}</span>
            `;
            statsContainer.appendChild(statEl);
        });

        // 渲染预览动画
        this.renderMonsterPreview(monster);
    }

    /**
     * 返回图鉴列表
     */
    showBestiaryGrid() {
        document.getElementById('monsterDetail').classList.remove('active');
        document.getElementById('bestiaryGrid').style.display = 'grid';
    }

    /**
     * 渲染怪物预览动画
     */
    renderMonsterPreview(monster) {
        const canvas = document.getElementById('monsterPreviewCanvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const size = 40;
        let animationTime = 0;

        const animate = () => {
            if (!document.getElementById('monsterDetail').classList.contains('active')) {
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // 绘制背景圆环
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = monster.color;
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.3 + Math.sin(animationTime * 0.05) * 0.1;
            ctx.stroke();

            // 绘制怪物emoji
            ctx.globalAlpha = 1;
            ctx.font = `${size * 1.5}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(monster.emoji, centerX, centerY);

            // 绘制badge
            if (monster.badge) {
                ctx.font = `${size * 0.5}px Arial`;
                ctx.fillText(monster.badge, centerX + size * 0.6, centerY - size * 0.8);
            }

            // 根据怪物类型绘制特效
            if (monster.id === 'fast') {
                // 快速怪：速度线
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(centerX - size - 20, centerY - size * 0.3 + i * size * 0.3);
                    ctx.lineTo(centerX - size, centerY - size * 0.3 + i * size * 0.3);
                    ctx.strokeStyle = monster.color;
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.5;
                    ctx.stroke();
                }
            } else if (monster.id === 'tank') {
                // 坦克怪：盾牌光环
                ctx.beginPath();
                ctx.arc(centerX, centerY, size * 1.2, 0, Math.PI * 2);
                ctx.strokeStyle = monster.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.4;
                ctx.stroke();
            } else if (monster.id === 'suicide') {
                // 自爆怪：爆炸预警
                const explodeProgress = (Math.sin(animationTime * 0.03) + 1) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, size * (1 + explodeProgress * 0.5), 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.font = '20px Arial';
                ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.fillText('💥', centerX, centerY);
            } else if (monster.id === 'healer') {
                // 回复怪：治疗光环
                const healProgress = (Math.sin(animationTime * 0.05) + 1) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, size * (1.5 + healProgress * 0.3), 0, Math.PI * 2);
                ctx.strokeStyle = monster.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.4 * healProgress;
                ctx.stroke();
                ctx.font = '20px Arial';
                ctx.fillStyle = monster.color;
                ctx.fillText('💚', centerX, centerY);
            } else if (monster.id === 'shielder') {
                // 大盾怪：盾牌效果
                const shieldProgress = (Math.sin(animationTime * 0.05) + 1) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, size * 1.3, 0, Math.PI * 2);
                ctx.strokeStyle = monster.color;
                ctx.lineWidth = 3;
                ctx.globalAlpha = 0.6 * shieldProgress;
                ctx.stroke();
                ctx.font = '20px Arial';
                ctx.fillStyle = monster.color;
                ctx.fillText('🔰', centerX, centerY);
            } else if (monster.id === 'ranged') {
                // 远程怪：弹道
                const projectileX = centerX + Math.cos(animationTime * 0.03) * size * 1.5;
                ctx.beginPath();
                ctx.arc(projectileX, centerY, 5, 0, Math.PI * 2);
                ctx.fillStyle = monster.color;
                ctx.fill();
                // 轨迹
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(projectileX, centerY);
                ctx.strokeStyle = monster.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.3;
                ctx.stroke();
            } else if (monster.id === 'boss') {
                // Boss：皇冠和多层光环
                ctx.font = '16px Arial';
                ctx.fillText('👑', centerX, centerY - size * 1.5);
                
                for (let i = 1; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, size * (0.8 + i * 0.4), 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 0, 0, ${0.3 + i * 0.1})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }

            animationTime += 16;
            requestAnimationFrame(animate);
        };

        animate();
    }

    // ==================== 暂停系统方法 ====================

    /**
     * 切换暂停状态
     */
    togglePause() {
        if (this.state === GameState.PLAYING) {
            this.pauseGame();
        } else if (this.state === GameState.PAUSED) {
            this.resumeGame();
        }
    }

    /**
     * 暂停游戏
     */
    pauseGame() {
        if (this.state !== GameState.PLAYING) return;

        // 设置游戏状态为暂停
        this.state = GameState.PAUSED;

        // 停止游戏循环
        if (this.gameLoopRequestId) {
            cancelAnimationFrame(this.gameLoopRequestId);
            this.gameLoopRequestId = null;
        }
        this.gameLoopRunning = false;

        // 停止天气音效
        this.soundEffect.stopWeatherSound();

        // 显示暂停界面
        this.showPauseScreen();
    }

    /**
     * 继续游戏
     */
    resumeGame() {
        if (this.state !== GameState.PAUSED) return;

        // 隐藏暂停界面
        document.getElementById('pauseScreen').classList.add('hidden');

        // 恢复游戏状态
        this.state = GameState.PLAYING;

        // 重置时间以避免deltaTime过大
        this.lastTime = performance.now();

        // 启动游戏循环
        this.gameLoop();
    }

    /**
     * 显示暂停界面
     */
    showPauseScreen() {
        // 更新暂停界面的统计数据
        document.getElementById('pauseRedpackets').textContent = this.totalRedPackets;
        document.getElementById('pauseKills').textContent = this.totalKills;
        document.getElementById('pauseScore').textContent = this.score;
        document.getElementById('pauseLevel').textContent = this.player ? this.player.level : 1;

        // 显示暂停界面
        document.getElementById('pauseScreen').classList.remove('hidden');
    }

    /**
     * 从暂停界面打开设置
     */
    openPauseSettings() {
        // 隐藏暂停界面
        document.getElementById('pauseScreen').classList.add('hidden');

        // 显示设置界面
        this.openSettings();
    }

    /**
     * 从暂停界面返回首页
     */
    returnToMenu() {
        // 隐藏暂停界面
        document.getElementById('pauseScreen').classList.add('hidden');

        // 显示开始界面
        this.showStartScreen();
    }
    
    gameOver() {
        // 取消游戏循环（如果正在运行）
        if (this.gameLoopRequestId) {
            cancelAnimationFrame(this.gameLoopRequestId);
            this.gameLoopRequestId = null;
        }
        this.gameLoopRunning = false;

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
            playerOffsetY = this.canvas.height * 0.15; // 移动端玩家偏上15%
        }

        const cameraX = this.player.x - this.canvas.width / 2;
        const cameraY = this.player.y - this.canvas.height / 2 + playerOffsetY;

        // 获取当前渲染质量等级
        const quality = this.getCurrentRenderQuality();

        // 根据质量设置阴影
        if (quality === 1) {
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
        }

        // 绘制地图背景
        this.drawMap(ctx, cameraX, cameraY);

        // 绘制天气背景效果（低质量时简化）
        if (quality >= 2) {
            this.weatherSystem.drawBackgroundEffect(ctx, this.canvas.width, this.canvas.height, cameraX, cameraY, this.player);
        }

        // 绘制红包（雾天天气下只渲染玩家附近的红包）
        if (this.weatherSystem.isInFoggyWeather()) {
            const foggyViewDistance = this.weatherSystem.getFoggyViewDistance();
            this.redPackets.forEach(redPacket => {
                const distance = Utils.distance(this.player.x, this.player.y, redPacket.x, redPacket.y);
                if (distance <= foggyViewDistance) {
                    redPacket.draw(ctx, cameraX, cameraY);
                }
            });
        } else {
            this.redPackets.forEach(redPacket => redPacket.draw(ctx, cameraX, cameraY));
        }

        // 绘制回复包
        this.healthPotions.forEach(potion => potion.draw(ctx, cameraX, cameraY));

        // 绘制雷击预警和特效
        this.lightningEffects.forEach(lightning => lightning.draw(ctx, cameraX, cameraY));

        // 绘制弹道
        this.projectiles.forEach(projectile => projectile.draw(ctx, cameraX, cameraY));

        // 绘制怪物
        this.monsters.forEach(monster => monster.draw(ctx, cameraX, cameraY));

        // 绘制Boss
        this.bosses.forEach(boss => boss.draw(ctx, cameraX, cameraY));

        // 绘制玩家
        this.player.draw(ctx, cameraX, cameraY);

        // 绘制攻击效果（半透明特效层）- 低质量时跳过
        if (quality >= 2) {
            this.attackEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));
        }

        // 绘制怪物自爆特效 - 低质量时简化
        if (quality >= 2) {
            this.monsterExplosionEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));
        }

        // 绘制小马受伤特效 - 低质量时简化
        if (quality >= 2) {
            this.playerHurtEffects.forEach(effect => effect.draw(ctx, cameraX, cameraY));
        }

        // 绘制技能特效 - 低质量时简化
        if (quality >= 2) {
            this.skillEffects.forEach(effect => {
                if (effect.active) {
                    this.drawSkillEffect(ctx, cameraX, cameraY, effect);
                }
            });
        }

        // 绘制回血阵 - 低质量时简化
        if (quality >= 2) {
            this.healFields.forEach(field => {
                if (field.active) {
                    this.drawHealField(ctx, cameraX, cameraY, field);
                }
            });
        }

        // 绘制伤害数字 - 中等质量及以上时显示完整效果，低质量时简化
        if (this.settings.showDamageNumbers) {
            if (quality >= 2) {
                this.damageNumbers.forEach(number => number.draw(ctx, cameraX, cameraY));
            } else if (quality === 1) {
                // 低质量模式：只显示文字，不显示特效
                this.damageNumbers.forEach(number => {
                    if (number.active) {
                        const screenX = number.x - cameraX;
                        const screenY = number.y - cameraY - (number.elapsed / number.duration * number.floatDistance);
                        const alpha = 1 - Math.pow(number.elapsed / number.duration, 2);

                        ctx.save();
                        ctx.fillStyle = number.color;
                        ctx.globalAlpha = alpha;
                        ctx.font = 'bold 16px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(number.value, screenX, screenY);
                        ctx.restore();
                    }
                });
            }
        }

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
            this.menuAnimationId = requestAnimationFrame(() => this.renderMenuBackground());
        } else {
            this.menuAnimationId = null;
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

        // 更新天气显示
        document.getElementById('weatherIcon').textContent = this.weatherSystem.getWeatherIcon();
        document.getElementById('weatherName').textContent = this.weatherSystem.getWeatherName();
        document.getElementById('weatherEffect').textContent = this.weatherSystem.getWeatherShortEffect();
        document.getElementById('weatherName').title = this.weatherSystem.getWeatherDescription();

        // 更新技能栏
        this.updateSkillCooldownUI();
    }

    // 更新技能冷却UI
    updateSkillCooldownUI() {
        if (!this.player) return;

        const learnedSkills = Object.keys(this.player.playerSkills.learned);
        const skillSlotElements = [
            document.getElementById('skillSlot1'),
            document.getElementById('skillSlot2'),
            document.getElementById('skillSlot3')
        ];

        const mobileSkillElements = [
            document.getElementById('mobileSkill1'),
            document.getElementById('mobileSkill2'),
            document.getElementById('mobileSkill3')
        ];

        // 获取设置
        const showSkillCooldown = this.settings?.showSkillCooldown !== false;

        // 为每个槽位更新显示
        learnedSkills.forEach((skillId, index) => {
            if (index >= 3) return;

            const skillConfig = CONFIG.SKILL.POOL[skillId];
            const skillStats = this.player.getSkillStats(skillId);
            const cooldownRemaining = this.player.getSkillCooldownRemaining(skillId);
            const cooldownTotal = skillConfig.baseCooldown;

            // 更新桌面端技能槽
            if (skillSlotElements[index]) {
                const iconElement = skillSlotElements[index].querySelector('.skill-slot-icon');
                const cooldownElement = skillSlotElements[index].querySelector('.skill-slot-cooldown');
                const cooldownTextElement = skillSlotElements[index].querySelector('.skill-slot-cooldown-text');

                if (iconElement) {
                    iconElement.textContent = skillConfig.icon;
                }

                if (cooldownElement) {
                    const cooldownPercent = (cooldownRemaining / cooldownTotal) * 100;
                    cooldownElement.style.height = `${cooldownPercent}%`;
                }

                if (cooldownTextElement) {
                    if (showSkillCooldown && cooldownRemaining > 0) {
                        const cooldownSeconds = Math.ceil(cooldownRemaining / 1000);
                        cooldownTextElement.textContent = `${cooldownSeconds}s`;
                        cooldownTextElement.style.display = 'block';
                    } else {
                        cooldownTextElement.textContent = '';
                        cooldownTextElement.style.display = 'none';
                    }
                }
            }

            // 更新移动端技能按钮
            if (mobileSkillElements[index]) {
                const iconElement = mobileSkillElements[index].querySelector('.mobile-skill-icon');
                const cooldownElement = mobileSkillElements[index].querySelector('.mobile-skill-cooldown');
                const cooldownTextElement = mobileSkillElements[index].querySelector('.mobile-skill-cooldown-text');

                if (iconElement) {
                    iconElement.textContent = skillConfig.icon;
                }

                if (cooldownElement) {
                    const cooldownPercent = (cooldownRemaining / cooldownTotal) * 100;
                    cooldownElement.style.height = `${cooldownPercent}%`;
                }

                if (cooldownTextElement) {
                    if (showSkillCooldown && cooldownRemaining > 0) {
                        const cooldownSeconds = Math.ceil(cooldownRemaining / 1000);
                        cooldownTextElement.textContent = `${cooldownSeconds}s`;
                        cooldownTextElement.style.display = 'block';
                    } else {
                        cooldownTextElement.textContent = '';
                        cooldownTextElement.style.display = 'none';
                    }
                }
            }
        });
    }

    // 清空技能栏UI
    clearSkillBarUI() {
        // 清空桌面端技能槽
        for (let i = 1; i <= 3; i++) {
            const skillSlot = document.getElementById(`skillSlot${i}`);
            if (skillSlot) {
                const iconElement = skillSlot.querySelector('.skill-slot-icon');
                const cooldownElement = skillSlot.querySelector('.skill-slot-cooldown');
                const cooldownTextElement = skillSlot.querySelector('.skill-slot-cooldown-text');

                if (iconElement) iconElement.textContent = '';
                if (cooldownElement) cooldownElement.style.height = '0%';
                if (cooldownTextElement) {
                    cooldownTextElement.textContent = '';
                    cooldownTextElement.style.display = 'none';
                }
            }
        }

        // 清空移动端技能按钮
        for (let i = 1; i <= 3; i++) {
            const mobileSkillButton = document.getElementById(`mobileSkill${i}`);
            if (mobileSkillButton) {
                const iconElement = mobileSkillButton.querySelector('.mobile-skill-icon');
                const cooldownElement = mobileSkillButton.querySelector('.mobile-skill-cooldown');
                const cooldownTextElement = mobileSkillButton.querySelector('.mobile-skill-cooldown-text');

                if (iconElement) iconElement.textContent = '';
                if (cooldownElement) cooldownElement.style.height = '0%';
                if (cooldownTextElement) {
                    cooldownTextElement.textContent = '';
                    cooldownTextElement.style.display = 'none';
                }
            }
        }
    }

    // 渲染技能栏
    renderSkillBar() {
        const skillBar = document.getElementById('skillBar');
        const mobileSkillButtons = document.getElementById('mobileSkillButtons');

        if (!this.player) {
            skillBar.classList.add('hidden');
            mobileSkillButtons.classList.add('hidden');
            return;
        }

        // 显示技能栏
        skillBar.classList.remove('hidden');
        mobileSkillButtons.classList.remove('hidden');
    }

    // ==================== 绘制技能特效 ====================
    drawSkillEffect(ctx, cameraX, cameraY, effect) {
        const screenX = effect.x - cameraX;
        const screenY = effect.y - cameraY;
        const progress = effect.elapsed / effect.duration;
        const alpha = 1 - progress;

        ctx.save();

        switch (effect.type) {
            case 'heal':
                // 回春术特效：绿色光圈
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = '#2ed573';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#2ed573';
                ctx.beginPath();
                ctx.arc(screenX, screenY, 50 + progress * 100, 0, Math.PI * 2);
                ctx.stroke();

                // 内圈
                ctx.strokeStyle = '#7bed9f';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(screenX, screenY, 30 + progress * 80, 0, Math.PI * 2);
                ctx.stroke();
                break;

            case 'blink':
                // 闪现术特效：金色闪光
                ctx.globalAlpha = alpha;
                ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
                ctx.shadowBlur = 30;
                ctx.shadowColor = '#FFD700';
                ctx.beginPath();
                ctx.arc(screenX, screenY, 40, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(screenX, screenY, 60 - progress * 40, 0, Math.PI * 2);
                ctx.stroke();
                break;

            case 'skyPunishment':
                // 天罚特效：全屏闪电
                ctx.globalAlpha = alpha * 0.3;
                ctx.fillStyle = '#FFE259';
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // 随机闪电线
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#FFD700';
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * this.canvas.width, 0);
                    ctx.lineTo(Math.random() * this.canvas.width, this.canvas.height);
                    ctx.stroke();
                }
                break;
        }

        ctx.restore();
    }

    // ==================== 绘制回血阵 ====================
    drawHealField(ctx, cameraX, cameraY, field) {
        const screenX = field.x - cameraX;
        const screenY = field.y - cameraY;
        const remaining = field.endTime - Date.now();
        const duration = field.duration;
        const alpha = Math.min(1, remaining / 2000);

        ctx.save();

        // 绘制回血阵范围
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillStyle = 'rgba(46, 213, 115, 0.2)';
        ctx.strokeStyle = 'rgba(46, 213, 115, 0.6)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(46, 213, 115, 0.8)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, field.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 绘制旋转的十字
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = 'rgba(46, 213, 115, 0.8)';
        ctx.lineWidth = 3;
        const angle = Date.now() / 1000;
        
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(angle);
        
        // 十字线
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(20, 0);
        ctx.moveTo(0, -20);
        ctx.lineTo(0, 20);
        ctx.stroke();

        // 四个角的小十字
        const crossSize = 8;
        const crossOffset = 15;
        
        ctx.beginPath();
        ctx.moveTo(-crossOffset - crossSize, -crossOffset);
        ctx.lineTo(-crossOffset + crossSize, -crossOffset);
        ctx.moveTo(-crossOffset, -crossOffset - crossSize);
        ctx.lineTo(-crossOffset, -crossOffset + crossSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(crossOffset - crossSize, -crossOffset);
        ctx.lineTo(crossOffset + crossSize, -crossOffset);
        ctx.moveTo(crossOffset, -crossOffset - crossSize);
        ctx.lineTo(crossOffset, -crossOffset + crossSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-crossOffset - crossSize, crossOffset);
        ctx.lineTo(-crossOffset + crossSize, crossOffset);
        ctx.moveTo(-crossOffset, crossOffset - crossSize);
        ctx.lineTo(-crossOffset, crossOffset + crossSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(crossOffset - crossSize, crossOffset);
        ctx.lineTo(crossOffset + crossSize, crossOffset);
        ctx.moveTo(crossOffset, crossOffset - crossSize);
        ctx.lineTo(crossOffset, crossOffset + crossSize);
        ctx.stroke();

        ctx.restore();
        ctx.restore();
    }
}

// ==================== 初始化游戏 ====================
window.addEventListener('load', () => {
    new Game();
});