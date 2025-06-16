//export const dummyAuth = {
//    users: [
//        { 
//            id: 1, 
//            username: "admin", 
//            password: "admin123", 
//            role: "admin",
//            nombre: "Administrador",
//            permisos: ["todos"]
//        },
//        { 
//            id: 2, 
//            username: "user", 
//            password: "user123", 
//            role: "user",
//            nombre: "Usuario Normal",
//            permisos: ["lectura"]
//        }
//    ],
//
//    login(username, password) {
//        const user = this.users.find(u => 
//            u.username === username && u.password === password
//        );
//        
//        if (!user) {
//            return { 
//                success: false, 
//                error: "Usuario o contraseña incorrectos" 
//            };
//        }
//        
//        return {
//            success: true,
//            token: `dummy-token-${user.id}-${Date.now()}`,
//            user: {
//                id: user.id,
//                username: user.username,
//                nombre: user.nombre,
//                role: user.role,
//                permisos: user.permisos
//            }
//        };
//    },
//
//    verifyToken(token) {
//        if (!token) return { success: false };
//        
//        const match = token.match(/dummy-token-(\d+)/);
//        if (!match) return { success: false };
//        
//        const userId = parseInt(match[1]);
//        const user = this.users.find(u => u.id === userId);
//        
//        if (!user) return { success: false };
//        
//        return {
//            success: true,
//            user: {
//                id: user.id,
//                username: user.username,
//                nombre: user.nombre,
//                role: user.role,
//                permisos: user.permisos
//            }
//        };
//    }
//};