import { useState } from 'react';
import { db } from '../baas/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit
} from 'firebase/firestore';

export const useFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveLogo = async (logoData: any) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'logos'), {
        ...logoData,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getLogos = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'logos'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSurprisePrompts = async () => {
    try {
      setLoading(true);
      const promptsRef = collection(db, 'surprisePrompts');
      const querySnapshot = await getDocs(promptsRef);
      return querySnapshot.docs.map(doc => doc.data().prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveLogo,
    getLogos,
    getSurprisePrompts
  };
}; 