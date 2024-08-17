import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "DELETE",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: () => `${USERS_URL}/profile`,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getProjects: builder.query({
      query: () => `${USERS_URL}/projects`,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/projects`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `${USERS_URL}/projects/${projectId}`,
        method: "DELETE",
      }),
    }),
    createEpisode: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `${USERS_URL}/projects/${projectId}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllEpisodes: builder.query({
      query: (projectId) => `${USERS_URL}/projects/${projectId}`,
    }),
    getEpisode: builder.query({
      query: ({ projectId, episodeId }) =>
        `${USERS_URL}/projects/${projectId}/${episodeId}`,
    }),
    updateEpisode: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `${USERS_URL}/projects/${projectId}/${data.episodeId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEpisode: builder.mutation({
      query: ({ projectId, episodeId }) => ({
        url: `${USERS_URL}/projects/${projectId}/${episodeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useCreateEpisodeMutation,
  useGetAllEpisodesQuery,
  useGetEpisodeQuery,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
} = usersApiSlice;
