/**
 * Configuration File EXAMPLE - Belajar Jepang App
 * 
 * CARA PAKAI:
 * 1. Copy file ini jadi "config.js"
 * 2. Ganti "GANTI_DENGAN_API_KEY_KAMU" dengan API key asli kamu
 * 3. Adjust settings sesuai kebutuhan
 * 
 * File config.js sudah ada di .gitignore jadi aman.
 */

const CONFIG = {
    // Gemini AI API Configuration
    gemini: {
        // 👉 Dapatkan API key gratis di: https://makersuite.google.com/app/apikey
        apiKey: "GANTI_DENGAN_API_KEY_KAMU",
        
        model: "gemini-2.5-flash-preview-05-20",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
        timeout: 8000,
        maxRetries: 3,
        enableCache: true
    },
    
    // Speech Recognition Settings
    speech: {
        language: "ja-JP",
        maxAlternatives: 5,
        interimResults: true,
        continuous: true,
        timeoutSeconds: 8
    },
    
    // App Settings
    app: {
        defaultTheme: "pastel",
        enableAudio: false,
        enableLiteMode: false,
        autoDetectLiteMode: true,
        storageKey: "kanaTrainer_v9",
        debug: false // Set true untuk development
    },
    
    // Feature Flags
    features: {
        aiPronunciation: true,
        aiExamples: true,
        speechRecognition: true,
        pomodoro: true,
        srsSystem: true,
        challengeMode: true,
        customSets: true
    },
    
    // Test/Quiz Settings
    quiz: {
        defaultQuestionCount: 10,
        maxQuestionCount: 100,
        defaultSyllablePerItem: 3,
        challengeDefaultMinutes: 3
    },
    
    // Performance Settings
    performance: {
        debounceDelay: 300,
        animationDuration: 200,
        toastDuration: 2500,
        lowMemoryThreshold: 4,
        lowCpuCoreThreshold: 4
    }
};

CONFIG.getGeminiApiUrl = function() {
    return `${this.gemini.baseUrl}/${this.gemini.model}:generateContent?key=${this.gemini.apiKey}`;
};

CONFIG.validate = function() {
    const errors = [];
    if (!this.gemini.apiKey || this.gemini.apiKey === "GANTI_DENGAN_API_KEY_KAMU") {
        errors.push("⚠️ Gemini API Key belum diset!");
    }
    if (errors.length > 0 && this.app.debug) {
        console.warn("Config Errors:", errors);
    }
    return errors;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
