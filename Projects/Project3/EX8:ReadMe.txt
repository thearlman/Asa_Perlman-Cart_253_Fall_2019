~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~UPDATE ON PROJECT 3!!!~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Much has changed in the last few weeks, but a lot of it has been re writing functions,
   tweaking variables and fixing little bugs, I would say the real "prototype" is the game timer,
   and its integration with the boss battle.***

***If it's too difficult to make it to the boss battle (I've been playing on my little laptop screen),
   changing the value of gameTime in script.js at (approximately line 67), from 100 to 10, should
   get you there quicker.

-The games structure has been modified using a gameState variable which is
 defined using strings i.e. "playing", "gameOver" etc.

-Many functions have been reorganized/ reshuffled into more logical classes.
 Much of the action now take place in Player.js

-The game still counts down on a timer, but as the timer reaches various milestones,
 the frequency of enemy spawning increases.

-When there is only a little time on the clock, it will stop, the planet will stop
 coming closer, and the boss will spawn. Which leads to the next update...

-There is a boss! For the time being, it throws three different types of "bullets"
 at the player (drawn at random from an array), and must be hit 6 times before being defeated.
 Each time the boss is hit, it speeds up. This part is still pretty janky, and not that fun...
 I'd be curious as to your thoughts on how to improve the player experience with the boss battle.
