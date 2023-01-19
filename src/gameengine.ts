class GameEngine {
  private background: Background;
  private isPaused: boolean;
  private wasEscapeKeyDown: boolean;
  private pauseMenu: PauseMenu;

  constructor() {
    this.background = new Background();
    this.isPaused = false;
    this.wasEscapeKeyDown = false;
    this.pauseMenu = new PauseMenu(100, 300, 400, 300, "#566E93");
  }

  public update() {
    this.togglePause();
    if (this.isPaused) return;

    this.background.update();
  }

  public draw() {
    this.background.draw();
    if (this.isPaused) {
      this.pauseMenu.draw();
    }
  }

  public togglePause() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
    // const espaceWasReleased = this.wasEscapeKeyDown && !keyIsDown(ESCAPE);

    if (espaceWasPressed) {
      // Show pause menu and pause game
      this.isPaused = !this.isPaused;
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }
}

// class PauseMenu {
//   private isPaused: boolean = false;

//   public togglePause(): void {
//       if (event.keyCode === 27) { // 27 is the key code for the Escape key
//           if (this.isPaused) {
//               // Hide pause menu and resume game
//               this.isPaused = false;
//           } else {
//               // Show pause menu and pause game
//               this.isPaused = true;
//               this.pauseMenu.draw();
//           }
//       }
//   }
// }
