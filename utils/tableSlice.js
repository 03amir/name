import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
    currentPage: 1,
    totalPages: 1,
    selectedRows: [],
    selectAll: false,
    dummyData: [],
  },
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.totalPages = Math.ceil(action.payload.length / 10);
      state.dummyData = action.payload;
    },

    searchUser: (state, action) => {
      const searchQuery = action.payload.toLowerCase().trim();

      const filteredUsers = state.dummyData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery) ||
          user.role.toLowerCase().includes(searchQuery)
      );

      state.data = filteredUsers;
      state.totalPages = Math.ceil(filteredUsers.length / 10);
      state.currentPage = 1;

    },

    pageChange: (state, action) => {
      state.currentPage = action.payload;
    },

    saveEditedUser: (state, action) => {
      const { id, name, email, role } = action.payload;

      const userIndex = state.data.findIndex((user) => user.id === id);
      const userIndex2 = state.dummyData.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.data[userIndex] = { id, name, email, role };
        state.dummyData[userIndex2] = { id, name, email, role };
      }
    },
    selectRow: (state, action) => {
      const { id, isChecked } = action.payload;
      console.log(action.payload);
      const isSelected = state.selectedRows.includes(id);

      if (isChecked) {
        state.selectedRows = isSelected
          ? state.selectedRows
          : [...state.selectedRows, id];
      } else {
        state.selectedRows = isSelected
          ? state.selectedRows.filter((selectedId) => selectedId !== id)
          : state.selectedRows;
      }

      state.selectAll = false;
    },
    selectAllRows: (state) => {
      const allRowIdsOnPage = state.data
        .slice((state.currentPage - 1) * 10, state.currentPage * 10)
        .map((item) => item.id);
      state.selectedRows = state.selectAll ? [] : allRowIdsOnPage;
      state.selectAll = !state.selectAll;
    },
    deleteSelectedRows: (state) => {
      state.data = state.data.filter(
        (item) => !state.selectedRows.includes(item.id)
      );
      state.dummyData = state.dummyData.filter(
        (item) => !state.selectedRows.includes(item.id)
      );
      state.totalPages = Math.ceil(state.data.length / 10);
      state.selectedRows = [];
      state.selectAll = false;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((user) => user.id !== id);
      state.dummyData = state.dummyData.filter((user) => user.id !== id);
      state.totalPages = Math.ceil(state.data.length / 10);
    },
  },
});

export const {
  pageChange,
  fetchDataSuccess,
  saveEditedUser,
  deleteUser,
  searchUser,
  selectRow,
  selectAllRows,
  deleteSelectedRows,
} = tableSlice.actions;
export default tableSlice.reducer;
