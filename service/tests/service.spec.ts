import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { app } from '../src/app';

describe('Service', () => {
  test('has a route handler listening to /service for post requests', async () => {
    const response = await request(app).post('/service').send({});

    expect(response.status).not.toEqual(404);
  });

  test('returns an error if the resource is not provided', () => {});

  test("returns an error if the resource type is not 'order'", () => {});

  test('returns an error if the order controller fails', () => {});

  test('returns a success response if the order controller succeeds', () => {});

  test('returns a success response with the correct status code', () => {});

  test('returns a success response with the correct update actions', () => {});

  test('logs a success message after processing the order', () => {});

  test('calls the next function if an error occurs', () => {});
});
