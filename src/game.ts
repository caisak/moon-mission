interface IStartGame {
  startNewGame(): void;
  resumeGame(): void;
  readAllPlayerScores(): number[];
  changeCurrentScene(scene: string): void;
  readCurrentPlayerScore(): number;
  changeCurrentPlayerScore(input: number): void;
  pushToAllPlayerScores(playerScore: number): void;
  scoreCheckSet(anything: boolean): void;
  scoreCheckGet(): boolean;
}

class Game implements IStartGame {
  private gameEngine: GameEngine;
  private gameMenu: GameMenu;
  private pauseMenu: PauseMenu;
  private gameOver: GameOver;
  private scoreboard: ScoreBoard;
  private menumusic: p5.SoundFile;
  private gameplaymusic: p5.SoundFile;
  private allPlayerScores: number[] = [0, 0, 0, 0, 0];
  private currentPlayerScore: number;
  private currentScene: string;
  private wasEscapeKeyDown: boolean;
  public addedScoreToList: boolean;

  constructor() {
    this.gameMenu = new GameMenu(this);
    this.pauseMenu = new PauseMenu(this);
    this.gameOver = new GameOver(this);
    this.scoreboard = new ScoreBoard(this);
    this.gameEngine = new GameEngine();
    this.menumusic = menumusic;
    this.gameplaymusic = gameplaymusic;
    this.currentScene = "start";
    this.currentPlayerScore = 0;
    this.wasEscapeKeyDown = false;
    this.addedScoreToList = false;
  }

  public update(): void {
    this.togglePause();

    switch (this.currentScene) {
      case "start":
        if (keyIsDown(72)) {
          console.log("pressed h");
          this.changeCurrentScene("score");
        }
        this.gameMenu.update();
        this.playMusic();
        break;
      case "score":
        this.scoreboard.update();
        this.playMusic();
        break;
      case "play":
        this.gameEngine.update();
        this.stopMusic();
        this.playMusic();
        break;
      case "pause":
        this.pauseMenu.update();
        break;
      case "end":
        this.gameOver.update();
        this.stopMusic();
        break;
    }
  }

  public draw(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.draw();
        break;
      case "score":
        this.scoreboard.draw();
        break;
      case "play":
        this.gameEngine.draw();
        break;
      case "pause":
        this.gameEngine.draw();
        this.pauseMenu.draw();
        break;
      case "end":
        this.gameEngine.draw();
        this.gameOver.draw();
        break;
    }
  }

  public startNewGame(): void {
    // Denna behövs bara när man börjar på currentScene "Pause"
    // this.addedScoreToList = false;
    this.scoreCheckSet(false);

    this.currentScene = "play";
    this.gameEngine = new GameEngine();
  }

  public resumeGame(): void {}

  public playMusic(): void {
    if (this.currentScene === "start") {
      if (!this.menumusic.isPlaying()) {
        this.menumusic.play();
      }
    } else if (this.currentScene === "play") {
      if (!this.gameplaymusic.isPlaying()) {
        this.gameplaymusic.play();
      }
    }
  }
  public stopMusic(): void {
    if (this.currentScene !== "start" && this.menumusic.isPlaying()) {
      this.menumusic.stop();
    }
    if (this.currentScene !== "play" && this.gameplaymusic.isPlaying()) {
      this.gameplaymusic.stop();
    }
  }

  public readAllPlayerScores() {
    return this.allPlayerScores;
  }

  public pushToAllPlayerScores(playerScore: number) {
    this.allPlayerScores.push(playerScore);
  }

  public changeCurrentScene(scene: string): void {
    this.currentScene = scene;
  }

  public readCurrentPlayerScore(): number {
    return this.currentPlayerScore;
  }

  public changeCurrentPlayerScore(input: number) {
    this.currentPlayerScore = input;
  }

  public togglePause() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
    if (espaceWasPressed && this.currentScene === "play") {
      this.currentScene = "pause";
      this.gameEngine.oxygenDisplay.pause();
    } else if (espaceWasPressed && this.currentScene === "pause") {
      this.currentScene = "play";
      this.gameEngine.oxygenDisplay.resume();
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }

  public scoreCheckSet(anything: boolean): void {
    this.addedScoreToList = anything;
  }
  public scoreCheckGet() {
    return this.addedScoreToList;
  }
}
