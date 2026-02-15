/**
 * Konfiguracja pojedynczej kolumny tabeli.
 */
export interface DataTableColumnOpts {
  /** Klucz pola w obiekcie wiersza (np. "id", "customerName"). */
  key: string;
  /** Etykieta nagłówka (klucz i18n lub tekst). */
  header: string;
  /** Czy kolumna jest sortowalna. */
  sortable?: boolean;
  /** Opcjonalna klasa CSS dla komórek (np. "max-w-[240px] truncate"). */
  cellClass?: string;
  /** Jeśli ustawione, treść komórki z slotu #cell-{key} (np. "status"). */
  cellSlot?: string;
}

/**
 * Opcje tabeli – kolumny, dane, zachowanie.
 */
export interface DataTableOpts<T = unknown> {
  /** Definicje kolumn. */
  columns: DataTableColumnOpts[];
  /** Dane (wiersze). */
  data: T[];
  /** Pole używane jako :key dla wierszy (domyślnie "id"). */
  rowKey?: string;
  /** Czy wiersze są klikalne (emit select). */
  selectable?: boolean;
  /** Aktualnie sortowane pole (key kolumny). */
  sortField?: string | null;
  /** Kierunek sortowania. */
  sortOrder?: "asc" | "desc";
  /** Tekst gdy brak danych (opcjonalnie). */
  emptyText?: string;
  /** Opcjonalna paginacja – gdy podana, pod tabelą renderowany jest TablePagination. */
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    /** Opcjonalna etykieta aktywnego filtra (np. "Nowe") – wyświetlana obok zakresu. */
    activeFilterLabel?: string;
  };
}

export type DataTableSortPayload = { field: string; order: "asc" | "desc" };
