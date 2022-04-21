# EAngaadi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running the unit tests in Headless mode

`ng test --no-watch --no-progress --browsers=ChromeHeadlessCI`

## Running unit tests with coverage

Run `ng test --no-watch --code-coverage --browsers=ChromeHeadlessCI` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Lint checking 

Run `npm run lint` to lint check the code

## Formatting staged files 

Run `npm run format:fix` to format staged files 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Feature Branching 

### Creating a feature branch

```
git checkout -b "FeatureBranchName"
```
### push changes to remote branch

```
git push 

```

## Merging

Follow below instructions for handling merge conflict when raising PullRequest with main branch

### Switch to main branch and pull the latest code

Note: Ensure that all you changes and staged files are committed into the feature branch before switching to main branch

```
    git checkout main
    git pull
```

### Switch back to the feature branch and marge from main

You will have the conflicts reported that needs to be merged manually 

```
    git checkout <branch_name>
    git merge main
```

After the conflicts are fixed manually commit and push the changes to the feature branch. Now the PullRequest should get updated and not show any conflict.


## Review Checklist

- Modules should not be important in app module
- Run lint for check
- File formatted using prettier
- Methods and Variable names should be in camelCase
- No commented piece of code
- No console logs
- Only known file changes are committed
- Routing is at module level
- Page and Component name stratgery is followed 

## Styling Review Checklist

- Always use variables for color and size