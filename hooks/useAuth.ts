// FIX: Removed unused imports that were causing a compilation error.

// This is a re-export for convenience, the actual implementation is in AuthContext.
// This simplifies imports in components.
export { useAuth } from '../context/AuthContext';
