module.exports = [
  {
    path: "a",
    type: "directory",
    children: [
      { name: "a-1", extname: "md", type: "file" },
      { name: "a-2", extname: "md", type: "file" },
      {
        path: "a-a1",
        type: "directory",
        children: [
          { name: "a-a-1", extname: "md", type: "file" },
          { path: "a-a-a1", type: "directory", children: [] },
        ],
      },
      {
        path: "a-a2",
        type: "directory",
        children: [{ name: "a-a2", extname: "md", type: "file" }],
      },
    ],
  },
  {
    path: "c",
    type: "directory",
    children: [{ name: "c", extname: "md", type: "file" }],
  },
  {
    path: "b",
    type: "directory",
    children: [
      { name: "b-1", extname: "md", type: "file" },
      { name: "b-2", extname: "md", type: "file" },
      {
        path: "b-b",
        type: "directory",
        children: [{ name: "b-b-1", extname: "md", type: "file" }],
      },
    ],
  },
  { path: "D", type: "directory", children: [] },
];
