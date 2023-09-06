There are 3 projects in this monorepo:
1. Editor - interface for writing code, file navigation, preview
2. Preview - interface for viewing the result real-time
3. Api - Express server for CRUD operations, auth. Not integrated to Front yet

# How to run
From the root path, run:
```
yarn dev
```

# Linting/Formatting
From the root path, run:
```
yarn lint
yarn format
```

# Adding dependency
From the root path, run
```
yarn workspace=<project> add <library>
```
