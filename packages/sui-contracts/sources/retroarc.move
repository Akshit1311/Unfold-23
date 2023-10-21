
// SPDX-License-Identifier: Apache-2.0

/// A retro arcade game module. With games like Cars, Snake, Tetris and Card Memory
module retroarc::user {
    use sui::coin::{Self, Coin};
    // use sui::event;
    use sui::object::{Self, ID, UID};
    // use sui::math;
    use sui::sui::SUI;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use sui::balance::{Self, Balance};
    use std::option::{Self, Option};



    // use std::option::{Self, Option};

    /// Our User!
    struct User has key, store {
        id: UID,
        /// Energy. If they go to zero, the user cannot play more games
        energy: u64,
        /// Experience of the User. Begins at zero
        xp: u64,
        /// The hero's minimal inventory
        powerup: Option<Powerup>,
        /// An ID of the game user is playing
        game_id: ID,
    }

    /// Power-ups to help the user in the game
    struct Powerup has key, store {
        id: UID,
        /// Name of the NFT
        name: String,
        // What power-ups does it give to the user
        description: String,
        // Image asset of the NFT
        url: Url,
        /// Amount of multiplier the power-up gives to the user
        magic: u64,
    }


    /// For giving extra lives to the user if they lose
    struct Life has key, store {
        id: UID,
        /// An ID of the game
        game_id: ID,
    }

    /// An immutable object that contains information about the
    /// game admin. Created only once in the module initializer,
    /// hence it cannot be recreated or falsified.
    struct GameInfo has key {
        id: UID,
        game_name: String,
        user_address: address,
    }

    struct GameShop has key {
        id: UID,
        price: u64,
        balance: Balance<SUI>
    }

    struct ShopOwnerCap has key { id: UID }


    /// Minimum amount you can pay for a power-up
    const MIN_POWERUP_COST: u64 = 100;
    // const MIN_GAME_COST: u64 = 1;

    // TODO: proper error codes
    /// Not enough money to purchase the given item
    const EInsufficientBalance: u64 = 0;

    fun init(ctx: &mut TxContext) {
        transfer::transfer(ShopOwnerCap {
            id: object::new(ctx)
        }, tx_context::sender(ctx));

        transfer::share_object(GameShop {
            id: object::new(ctx),
            price: 1,
            balance: balance::zero()
        })
    }


    public entry fun start_game(game_name: String, shop: &mut GameShop, payment: &mut Coin<SUI>, ctx: &mut TxContext) {
        assert!(coin::value(payment) >= shop.price, EInsufficientBalance);

        let coin_balance = coin::balance_mut(payment);
        let paid = balance::split(coin_balance, shop.price);

        balance::join(&mut shop.balance, paid);

        transfer::transfer(GameInfo {
            id: object::new(ctx),
            game_name: game_name,
            user_address: tx_context::sender(ctx)
        }, tx_context::sender(ctx))

    }


    public entry fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let nft = Powerup {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            magic: 1
        };

        transfer::transfer(nft, sender);
    }
   

    
}