import { useState, useEffect } from 'react';
import { auth, db } from '@/integrations/firebase/client';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function FirebaseTest() {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        // Test Authentication
        const testEmail = `test${Date.now()}@test.com`;
        const testPassword = 'test123456';
        
        // Create test user
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        setStatus('Authentication: ✓');
        
        // Test Firestore
        const testCollection = collection(db, 'test');
        await addDoc(testCollection, { test: 'data' });
        const snapshot = await getDocs(testCollection);
        if (snapshot.docs.length > 0) {
          setStatus(prev => prev + '\nFirestore: ✓');
        }
        
        // Note: Storage test is skipped as it requires a billing plan upgrade
        setStatus(prev => prev + '\nStorage: Skipped (requires billing plan upgrade)');
        
        // Clean up
        await userCredential.user.delete();
        snapshot.docs.forEach(doc => doc.ref.delete());
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setStatus('Test failed');
      }
    };

    testFirebaseConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{status}</pre>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded">
        <p className="font-medium">Note:</p>
        <p className="text-sm mt-1">
          Firebase Storage is currently disabled as it requires a billing plan upgrade.
          The application will work without image uploads until the billing plan is upgraded.
        </p>
      </div>
    </div>
  );
} 