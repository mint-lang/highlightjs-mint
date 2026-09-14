/* Records provide equality and serialization tools */
record Lang {
  name : String,
  fans : Number using "super_fans",
  isAwesome : Bool using "is_awesome"
}

/* Stores handle state and mutations */
store Application {
  state lang : Lang = Lang("Mint", 42, true)
  state love : Number = 5

  fun giveLove : Promise(Never, Void) {
    next { love = love + 1 }
  }
}

/* Components are dynamically styled and connect stores */
component Main {
  connect Application exposing { lang, love }

  style base {
    display: flex;

    if (love > 5) {
      color: red;
    }
  }

  fun render : Html {
    <div::base>
      "#{lang.name} has #{lang.fans} fans"
    </div>
  }
}
