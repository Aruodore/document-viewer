import { useSearchParams } from "react-router";

/**
 * A custom hook for managing and updating search parameters in the URL.
 * @returns An object containing search params and update functions.
 */
export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Updates the search parameters in the URL.
   * @param {Record<string, string | null | undefined>} params - Key-value pairs to update in the search params.
   * @param {boolean} replace - Whether to replace the current history entry (default: false).
   */
  const updateSearchParams = (
    params: Record<string, string | null | undefined>,
    replace: boolean = false
  ): void => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        newSearchParams.delete(key); // Remove if value is null, undefined, or empty string
      } else {
        newSearchParams.set(key, value);
      }
    });

    setSearchParams(newSearchParams, { replace });
  };

  /**
   * Removes specified search parameters from the URL.
   * @param {string[]} keys - An array of keys to remove from the search params.
   * @param {boolean} replace - Whether to replace the current history entry (default: false).
   */
  const removeSearchParams = (
    keys: string[],
    replace: boolean = false
  ): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    keys.forEach((key) => newSearchParams.delete(key));
    setSearchParams(newSearchParams, { replace });
  };

  return {
    searchParams: Object.fromEntries(searchParams.entries()), // Converts URLSearchParams to an object
    updateSearchParams,
    removeSearchParams,
  };
};
