import { MongoClient } from "mongodb";

class MongoDB {
  async connect() {
    this.client = new MongoClient(process.env.MONGODB_URI, {});
    await this.client.connect();
    this.db = this.client.db("notion");
  }

  disconnect() {
    this.client.close();
  }

  async run(func) {
    let result = null;
    try {
      await this.connect();
      result = await func();
    } catch (e) {
      console.error("문제 발생", e);
    } finally {
      this.disconnect();
    }
    return result;
  }

  async getCategories() {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("categories")
        .find()
        .project({ _id: 0 });

      const result = await cursor.toArray();
      await cursor.close();

      return result;
    });
  }

  async getPosts(category, pageSize, currPage) {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("posts")
        .find(category ? { category: { $eq: category } } : null)
        .project({ _id: 0, body: 0 })
        .skip(currPage * pageSize)
        .limit(pageSize);

      const data = await cursor.toArray();
      const result = {
        data,
        hasMore: await cursor.hasNext(),
      };
      await cursor.close();
      return result;
    });
  }

  async getPost(slug) {
    return await this.run(async () => {
      return await this.db.collection("posts").findOne({ slug });
    });
  }

  async getMusics() {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("musics")
        .find()
        .project({ _id: 0 });
      const result = await cursor.toArray();
      await cursor.close();

      return result;
    });
  }

  async getDiary(pageSize, currPage) {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("diary")
        .find()
        .project({ _id: 0 })
        .skip(currPage * pageSize)
        .limit(pageSize);
      const result = await cursor.toArray();

      await cursor.close();

      return result;
    });
  }

  // async fetch(category, pageSize, currPage, postId) {
  //   return await this.run(async () => {
  //     const postsCol = await this.db.collection("posts");

  //     let cursor = postsCol
  //       .find(category ? { category: { $eq: category } } : null)
  //       .project({ _id: 0, body: 0 })
  //       .skip(currPage * pageSize)
  //       .limit(pageSize);

  //     const posts = await cursor.toArray();
  //     await cursor.close();

  //     const id = postId ? postId : posts[0].id;
  //     const post = await postsCol.findOne({ id });

  //     cursor = await this.db
  //       .collection("categories")
  //       .find()
  //       .project({ _id: 0 });

  //     const categories = await cursor.toArray();
  //     await cursor.close();

  //     return { posts, post, categories };
  //   });
  // }

  // async getCategories() {
  //   return await this.run(async () => {
  //     const cursor = await this.db
  //       .collection("categories")
  //       .find()
  //       .project({ _id: 0 });

  //     const result = await cursor.toArray();
  //     await cursor.close();

  //     return result;
  //   });
  // }

  // async sendMsg(param) {
  //   return await this.run(async () => {
  //     if (process.env.NODE_ENV !== "production") {
  //       param.name = "VueLoger";
  //       param.admin = true;
  //     }
  //     await this.db.collection("chats").insertOne(param);
  //   });
  // }
  // async getMsgs() {
  //   return await this.run(async () => {
  //     const cursor = await this.db
  //       .collection("chats")
  //       .find()
  //       .project({ _id: 0 });

  //     const result = await cursor.toArray();
  //     await cursor.close();

  //     return result;
  //   });
  // }
}

export { MongoDB };
