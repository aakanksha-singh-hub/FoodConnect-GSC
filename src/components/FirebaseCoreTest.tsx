import { useState, useEffect } from 'react';
import { auth, db } from '@/integrations/firebase/client';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function FirebaseCoreTest() {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebaseCore = async () => {
      try {
        // Test Authentication
        const testEmail = `test${Date.now()}@test.com`;
        const testPassword = 'test123456';
        
        // Create test user
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        setStatus('Authentication - Create User: ✓');
        
        // Sign out
        await signOut(auth);
        setStatus(prev => prev + '\nAuthentication - Sign Out: ✓');
        
        // Sign in
        await signInWithEmailAndPassword(auth, testEmail, testPassword);
        setStatus(prev => prev + '\nAuthentication - Sign In: ✓');
        
        // Test Firestore - Create
        const testCollection = collection(db, 'test');
        const docRef = await addDoc(testCollection, { 
          test: 'data',
          timestamp: new Date().toISOString()
        });
        setStatus(prev => prev + '\nFirestore - Create Document: ✓');
        
        // Test Firestore - Read
        const snapshot = await getDocs(testCollection);
        if (snapshot.docs.length > 0) {
          setStatus(prev => prev + '\nFirestore - Read Documents: ✓');
        }
        
        // Test Firestore - Delete
        await deleteDoc(doc(db, 'test', docRef.id));
        setStatus(prev => prev + '\nFirestore - Delete Document: ✓');
        
        // Clean up
        await userCredential.user.delete();
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setStatus('Test failed');
      }
    };

    testFirebaseCore();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Firebase Core Services Test</h2>
      <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded">
        <p className="font-medium">Testing Core Firebase Services:</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Authentication (User Management)</li>
          <li>Firestore (Database Operations)</li>
        </ul>
      </div>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{status}</pre>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
} 